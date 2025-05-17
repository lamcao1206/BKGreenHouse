import sys
import paho.mqtt.client as mqtt
import time
import random
import certifi
import ssl
import logging

logging.basicConfig(level=logging.DEBUG)

# Adafruit IO credentials
AIO_USERNAME = "greenhousebk22"
AIO_KEY = "aio_WyYs04yMMy9PZA08bmDYrsDWHjJG"
AIO_HOST = "io.adafruit.com"
AIO_PORT = 8883  # SSL port
IDLE=10

# MQTT topics for Adafruit IO feeds
TEMPERATURE_FEED = f"{AIO_USERNAME}/feeds/temperature"
HUMIDITY_FEED = f"{AIO_USERNAME}/feeds/humidity"
SOIL_MOISTURE_FEED = f"{AIO_USERNAME}/feeds/soil_moisture"
LIGHT_FEED = f"{AIO_USERNAME}/feeds/light"

# MQTT event callbacks
def on_connect(client, userdata, flags, rc, properties=None):
    print(f"Connected with result code {rc}")
    if rc == 0:
        print("Connected to Adafruit IO successfully")
    else:
        print("Failed to connect, return code:", rc)

def on_disconnect(client, userdata, rc, properties=None):
    print(f"Disconnected with result code {rc}")


# Initialize MQTT client
client = mqtt.Client(client_id="publisher", protocol=mqtt.MQTTv311)
client.username_pw_set(AIO_USERNAME, AIO_KEY)
client.on_connect = on_connect
client.on_disconnect = on_disconnect

# Set up TLS/SSL
client.tls_set(ca_certs=certifi.where(), cert_reqs=ssl.CERT_REQUIRED)

# Connect to Adafruit IO
client.connect(AIO_HOST, AIO_PORT)
client.loop_start()

print(f"Connecting to {AIO_HOST}:{AIO_PORT} with SSL...")

# Publish data to Adafruit IO
counter = IDLE
while True:
    counter -= 1
    if counter <= 0:
        counter = IDLE

        temperature = random.randint(10, 50)  
        humidity = random.randint(30, 90)  
        soil_moisture = random.randint(10, 100)  
        light_intensity = random.randint(100, 1000)  

        client.publish(TEMPERATURE_FEED, temperature)
        print(f"Published temperature: {temperature}°C")

        client.publish(HUMIDITY_FEED, humidity)
        print(f"Published humidity: {humidity}%")

        client.publish(SOIL_MOISTURE_FEED, soil_moisture)
        print(f"Published soil moisture: {soil_moisture}%")

        client.publish(LIGHT_FEED, light_intensity)
        print(f"Published light intensity: {light_intensity} lux")

    time.sleep(1)