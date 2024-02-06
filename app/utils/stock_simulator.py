import threading
import time
import random
from .market_logic import generate_random_event  # Import the function

class Stock:
    def __init__(self, name, initial_price, category):
        self.name = name
        self.price = initial_price
        self.category = category
        self.trend = "neutral"
        self.trend_duration = 0  # How long the trend has been active

    def update_price(self):
        # Basic trend and noise
        base_trend = random.uniform(-1.5, 1.5)  # More dramatic changes
        noise = random.uniform(-0.3, 0.3)

        # Trend logic
        if self.trend == "bullish":
            base_trend += random.uniform(0.5, 1.5)
            self.trend_duration += 1
        elif self.trend == "bearish":
            base_trend += random.uniform(-1.5, -0.5)
            self.trend_duration += 1
        else:
            # Chance to start a new trend
            if random.random() < 0.2:  # 20% chance to start a trend
                if random.random() < 0.5:
                    self.trend = "bullish"
                else:
                    self.trend = "bearish"
                self.trend_duration = 0

        # Apply changes
        self.price += base_trend + noise

        # Ensure price doesn't go negative
        if self.price < 0.01:
            self.price = 0.01

        # Reset trend if it's been active for too long
        if self.trend_duration > 5:  # Trends last for 5 updates
            self.trend = "neutral"
            self.trend_duration = 0




class StockSimulator:
    def __init__(self):
        self.stocks = {}
        self.lock = threading.Lock()

    def add_stock(self, name, initial_price, category):
        with self.lock:
            self.stocks[name] = Stock(name, initial_price, category)

    def update_stocks(self):
        with self.lock:
            for stock in self.stocks.values():
                stock.update_price()

    def start_simulation(self, socketio):
        def run():
            counter = 0
            while True:
                self.update_stocks()
                time.sleep(1)  # Update every second
                
                # Call generate_random_event every 10 seconds as an example
                if counter % 10 == 0:
                    generate_random_event(self, socketio)  # Pass socketio instance
                counter += 1

        thread = threading.Thread(target=run)
        thread.daemon = True  # Daemonize thread
        thread.start()

    def get_stock_price(self, name):
        with self.lock:
            return self.stocks.get(name).price if name in self.stocks else None