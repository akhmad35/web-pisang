from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/")
def home():
    return "Flask API is running on Vercel 🚀"

@app.route("/predict")
def predict():
    return jsonify({"message": "API working"})

# wajib untuk Vercel
app = app