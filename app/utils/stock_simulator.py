import threading
import time
import random

class Stock:
    def __init__(self, name, initial_price):
        self.name = name
        self.price = initial_price

    def update_price(self):
        # This is a placeholder for a more complex price update logic
        self.price += random.uniform(-0.5, 0.5)  # Randomly vary the price

class StockSimulator:
    def __init__(self):
        self.stocks = {}
        self.lock = threading.Lock()

    def add_stock(self, name, initial_price):
        with self.lock:
            self.stocks[name] = Stock(name, initial_price)

    def update_stocks(self):
        with self.lock:
            for stock in self.stocks.values():
                stock.update_price()

    def start_simulation(self):
        def run():
            while True:
                self.update_stocks()
                time.sleep(1)  # Update every second

        thread = threading.Thread(target=run)
        thread.daemon = True  # Daemonize thread
        thread.start()

    def get_stock_price(self, name):
        with self.lock:
            return self.stocks.get(name).price if name in self.stocks else None
