import numpy as np
from flask import Flask, request, render_template
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import load_img, img_to_array
from tensorflow.keras.applications.mobilenet_v3 import preprocess_input
from io import BytesIO

app = Flask(__name__)

# Load model MobileNetV3
model = load_model("banana_mobilenetv3.h5", compile=False)

model.save("model/banana_fixed.keras")

CATEGORIES = ["overripe", "ripe", "rotten", "unripe"]

def predict_image(file_data):
    # Load dan resize sesuai MobileNetV3
    img = load_img(BytesIO(file_data), target_size=(224, 224))
    img = img_to_array(img)
    img = preprocess_input(img)          # preprocessing MobileNetV3
    img = np.expand_dims(img, axis=0)    # tambah batch dim
    prediction = model.predict(img)
    return CATEGORIES[np.argmax(prediction)]

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/upload")
def upload_page():
    return render_template("upload.html")

@app.route("/capture")
def capture_page():
    return render_template("capture.html")

@app.route("/realtime")
def realtime_page():
    return render_template("realtime.html")

@app.route("/predict", methods=["POST"])
def predict():
    file = request.files["image"]
    result = predict_image(file.read())
    return result

if __name__ == "__main__":
    app.run(debug=True)
