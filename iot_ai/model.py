import pandas as pd
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Dropout
from tensorflow.keras.callbacks import EarlyStopping
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, accuracy_score, confusion_matrix
import seaborn as sns
import matplotlib.pyplot as plt

# Step 1: Load and inspect dataset
filtered_df = pd.read_csv("filtered_plant_data.csv")
print("🔍 Dataset overview:\n", filtered_df.describe())
print("\n🌿 Class distribution:\n", filtered_df["Plant_Health_Status"].value_counts())

# Step 2: Define features and labels (include Humidity)
X = filtered_df[["Ambient_Temperature", "Soil_Moisture", "Light_Intensity", "Humidity"]]
y = filtered_df["Plant_Health_Status"]

# Step 3: Encode class labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)
class_names = label_encoder.classes_

# Step 4: Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y_encoded, test_size=0.2, random_state=42, stratify=y_encoded
)

# Step 5: Scale the features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Step 6: Build the model (input shape changed to 4)
model = Sequential([
    Dense(128, input_shape=(4,), activation='relu'),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.2),
    Dense(len(class_names), activation='softmax')
])

# Step 7: Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Step 8: Train the model
early_stop = EarlyStopping(monitor='val_loss', patience=10, restore_best_weights=True)

history = model.fit(
    X_train_scaled, y_train,
    validation_split=0.2,
    epochs=100,
    batch_size=32,
    callbacks=[early_stop],
    verbose=1
)

# Step 9: Evaluate the model
y_pred_prob = model.predict(X_test_scaled)
y_pred_classes = np.argmax(y_pred_prob, axis=1)

accuracy = accuracy_score(y_test, y_pred_classes)
report = classification_report(y_test, y_pred_classes, target_names=class_names)

print(f"\n✅ Accuracy: {accuracy:.4f}")
print(f"\n📊 Classification Report:\n{report}")

# Step 10: Plot confusion matrix
cm = confusion_matrix(y_test, y_pred_classes)
plt.figure(figsize=(6, 4))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=class_names, yticklabels=class_names)
plt.title('Confusion Matrix')
plt.xlabel('Predicted')
plt.ylabel('Actual')
plt.show()

# Step 11: Predict function with probability
def predict_plant_health(ambient_temp, soil_moisture, light_intensity, humidity, thresholding=True):
    input_df = pd.DataFrame([[ambient_temp, soil_moisture, light_intensity, humidity]],
                            columns=["Ambient_Temperature", "Soil_Moisture", "Light_Intensity", "Humidity"])
    
    input_scaled = scaler.transform(input_df)
    probs = model.predict(input_scaled)[0]
    predicted_class_idx = np.argmax(probs)
    predicted_label = class_names[predicted_class_idx]
    confidence = probs[predicted_class_idx]

    print(f"\n📈 Prediction confidence scores:")
    for label, prob in zip(class_names, probs):
        print(f"- {label}: {prob:.2%}")

    # Optional rule-based override
    if thresholding and (ambient_temp > 50 or ambient_temp < 0 or soil_moisture < 10):
        print("⚠️ Unusual input detected. Overriding prediction to 'Unhealthy'.")
        return "Unhealthy"

    return predicted_label

model.save("plant_health_model.h5")

# Save scaler
import joblib
joblib.dump(scaler, "scaler.save")

# Save label encoder
joblib.dump(label_encoder, "label_encoder.save")

print("✅ Model, scaler, and label encoder saved successfully.")
# Example prediction
# result = predict_plant_health(10.0, 60, 200, 55.0)
# print(f"\n🌿 Predicted Plant Health Status: {result}")
