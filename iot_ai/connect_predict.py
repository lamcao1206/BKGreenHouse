import sys
import time
import csv
import os
from datetime import datetime, timedelta

import pandas as pd
import numpy as np
from tensorflow.keras.models import load_model
from sklearn.preprocessing import StandardScaler
import joblib
from Adafruit_IO import MQTTClient
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Adafruit IO credentials and feed IDs
AIO_FEED_ID = os.getenv("AIO_FEED_ID").split(",")  # Input topics
AIO_USERNAME = os.getenv("AIO_USERNAME")
AIO_KEY = os.getenv("AIO_KEY")
AIO_RESULT_FEED = os.getenv("AIO_RESULT_FEED")     # Output topic

# Load saved ML model, scaler, and label encoder
model = load_model("plant_health_model.h5")
scaler = joblib.load("scaler.save")
label_encoder = joblib.load("label_encoder.save")

# Buffer for storing incoming sensor values
sensor_data = {}

# Callback when connected
def connected(client):
    print("✅ Connected to Adafruit IO")
    for feed in AIO_FEED_ID:
        client.subscribe(feed)
        print(f"📡 Subscribed to {feed}")

# Callback when subscription succeeds
def subscribe(client, userdata, mid, granted_qos):
    print("🔔 Subscription successful")

# Callback when disconnected
def disconnected(client):
    print("❌ Disconnected from Adafruit IO")
    sys.exit(1)


# Buffer to store sensor values with timestamps
sensor_data = {}  # {feed_id: (value, timestamp)}

# Set max allowed time difference between sensor updates
TIME_WINDOW_SECONDS = 10

# Callback for incoming messages
def message(client, feed_id, payload):
    print(f"📥 Data from {feed_id}: {payload}")
    try:
        value = float(payload)
        sensor_data[feed_id] = (value, datetime.now())
    except ValueError:
        print(f"⚠️ Invalid data from {feed_id}: {payload}")
        return

    # Proceed only if all feeds have data
    if all(feed in sensor_data for feed in AIO_FEED_ID):
        timestamps = [sensor_data[feed][1] for feed in AIO_FEED_ID]
        max_time = max(timestamps)
        min_time = min(timestamps)

        if (max_time - min_time) <= timedelta(seconds=TIME_WINDOW_SECONDS):
            try:
                input_data = [sensor_data[feed][0] for feed in AIO_FEED_ID]
                input_df = pd.DataFrame([input_data], columns=["Ambient_Temperature", "Soil_Moisture", "Light_Intensity", "Humidity"])
                input_scaled = scaler.transform(input_df)

                probs = model.predict(input_scaled)[0]
                predicted_idx = np.argmax(probs)
                predicted_label = label_encoder.inverse_transform([predicted_idx])[0]
                confidence = probs[predicted_idx]

                print(f"🌿 Predicted Health: {predicted_label} ({confidence:.2%})")

                client.publish(AIO_RESULT_FEED, predicted_label)

                with open("data_log.csv", "a", newline="") as f:
                    writer = csv.writer(f)
                    writer.writerow([datetime.now()] + input_data + [predicted_label])

            except Exception as e:
                print("🚨 Error during prediction:", e)
            finally:
                sensor_data.clear()  # Reset buffer after prediction
        else:
            print("⌛ Sensor data timestamps are too far apart. Waiting for new data...")
            sensor_data.clear()

# Configure and start the MQTT client
client = MQTTClient(AIO_USERNAME, AIO_KEY)
client.on_connect = connected
client.on_disconnect = disconnected
client.on_message = message
client.on_subscribe = subscribe

client.connect()
client.loop_background()

# Keep the script alive
print("🚀 Listening for sensor data...")
while True:
    time.sleep(1)
