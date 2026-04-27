from flask import Flask

app = Flask(__name__)

@app.route("/")
def home():
    return "🚀 Flask on Vercel is working!"

# WAJIB untuk Vercel
def handler(environ, start_response):
    return app(environ, start_response)