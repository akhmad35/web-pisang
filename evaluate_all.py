import os
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import load_model
from sklearn.metrics import classification_report, confusion_matrix

# ===========================
# 1. CONFIG
# ===========================
DATASET_DIR = "dataset_pisang"
TEST_DIR = DATASET_DIR + "/test"
MODEL_PATH = "banana_mobilenetv3.h5"
CATEGORIES = ["overripe", "ripe", "rotten", "unripe"]

print("\n=== 1. CEK JUMLAH DATASET PER KELAS ===")
for cls in os.listdir(TEST_DIR):
    cls_path = os.path.join(TEST_DIR, cls)
    if os.path.isdir(cls_path):
        print(f"{cls}: {len(os.listdir(cls_path))} gambar")

# ===========================
# 2. LOAD MODEL
# ===========================
print("\n=== 2. LOAD MODEL ===")
model = load_model(MODEL_PATH)
print("Model loaded:", MODEL_PATH)

# ===========================
# 3. LOAD TEST DATA
# ===========================
print("\n=== 3. LOAD DATA TEST ===")
datagen = ImageDataGenerator()
test_gen = datagen.flow_from_directory(
    TEST_DIR,
    target_size=(224, 224),
    batch_size=32,
    class_mode='categorical',
    shuffle=False
)

# ===========================
# 4. PREDIKSI
# ===========================
print("\n=== 4. PREDIKSI DATA TEST ===")
predictions = model.predict(test_gen)
y_pred = np.argmax(predictions, axis=1)
y_true = test_gen.classes

# ===========================
# 5. CONFUSION MATRIX
# ===========================
print("\n=== 5. CONFUSION MATRIX ===")
cm = confusion_matrix(y_true, y_pred)

plt.figure(figsize=(7,6))
sns.heatmap(cm, annot=True, fmt="d", cmap="Blues",
            xticklabels=CATEGORIES, yticklabels=CATEGORIES)
plt.xlabel("Predicted")
plt.ylabel("Actual")
plt.title("Confusion Matrix")
plt.tight_layout()
plt.savefig("confusion_matrix.png")
plt.close()

print("Confusion matrix saved → confusion_matrix.png")

# ===========================
# 6. CLASSIFICATION REPORT
# ===========================
print("\n=== 6. CLASSIFICATION REPORT ===")
report = classification_report(y_true, y_pred, target_names=CATEGORIES)
print(report)

with open("classification_report.txt", "w") as f:
    f.write(report)

print("Classification report saved → classification_report.txt")

# ===========================
# 7. AKURASI MODEL
# ===========================
from sklearn.metrics import accuracy_score
acc = accuracy_score(y_true, y_pred)
print(f"\nAKURASI MODEL: {acc*100:.2f}%\n")

