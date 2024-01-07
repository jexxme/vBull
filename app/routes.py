from app import app

@app.route('/')
def index():
    return "Hello, this is the Fake Stock Market!"
