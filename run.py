from app import socketio, app
from app.routes import update_stock_prices

def stock_price_update_task():
    while True:
        update_stock_prices()
        socketio.sleep(1)  # Sleep for 1 second

if __name__ == '__main__':
    socketio.start_background_task(stock_price_update_task)
    socketio.run(app)
