from flask import Flask
from flask_socketio import SocketIO

app = Flask(__name__)
socketio = SocketIO(app)

from . import socketio, routes  # Import routes and socketio instance

def stock_price_update_task():
    while True:
        routes.update_stock_prices()
        socketio.sleep(1)  # Sleep for 1 second

if __name__ == '__main__':
    socketio.start_background_task(stock_price_update_task)
    socketio.run(app)

from app import routes  # Import routes after creating the app instance
