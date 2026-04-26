import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, classification_report
import seaborn as sns
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input

# ============================
# Load Model
# ============================
model = load_model("banana_mobilenetv3.h5")

# ============================
# Load Dataset (VALIDATION = TEST)
# ============================
DATASET_DIR = "dataset_pisang/valid"

datagen = ImageDataGenerator(preprocessing_function=preprocess_input)

valid_gen = datagen.flow_from_directory(
    DATASET_DIR,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical",
    shuffle=False
)

# ============================
# Prediksi Semua Gambar Valid
# ============================
pred = model.predict(valid_gen)
y_pred = np.argmax(pred, axis=1)
y_true = valid_gen.classes

class_labels = list(valid_gen.class_indices.keys())

# ============================
# CONFUSION MATRIX
# ============================
cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(7, 6))
sns.heatmap(cm, annot=True, fmt='d', cmap='Blues',
            xticklabels=class_labels,
            yticklabels=class_labels)
plt.xlabel("Predicted Label")
plt.ylabel("True Label")
plt.title("Confusion Matrix - Banana Ripeness Classification")
plt.show()

# ============================
# CLASSIFICATION REPORT
# ============================
print("\nClassification Report:")
print(classification_report(y_true, y_pred, target_names=class_labels))
