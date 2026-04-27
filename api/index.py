from flask import Flask, render_template, request, jsonify
import os

app = Flask(__name__, 
    template_folder=os.path.join(os.path.dirname(__file__), '../templates'),
    static_folder=os.path.join(os.path.dirname(__file__), '../static'))

# Routes Anda di sini
@app.route('/')
def index():
    return render_template('index.html')

# ... routes lainnya