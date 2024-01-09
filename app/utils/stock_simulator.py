import threading
import time
import random
from .market_logic import generate_random_event  # Import the function


class Stock:
    def __init__(self, name, initial_price, category):
        self.name = name
        self.price = initial_price
        self.category = category
        
    def update_price(self):
        # Base trend and noise - more exaggerated
        trend = random.uniform(-1.5, 1.5)  # Increased range for more dramatic changes
        noise = random.uniform(-0.3, 0.3)  # Larger noise for more volatility

        # Increased chance and magnitude of major fluctuations
        major_fluctuation_chance = 0.4  # 40% chance of a major fluctuation
        major_increase = random.uniform(1.5, 4)  # More significant increase
        major_decrease = random.uniform(-4, -1.5)  # More significant decrease

        # Determine if a major fluctuation occurs
        if random.random() < major_fluctuation_chance:
            if random.choice([True, False]):  # Randomly choose between rise and fall
                trend += major_increase
            else:
                trend += major_decrease
            
        # Update price
        self.price += trend + noise

        # Ensure the price doesn't go negative
        if self.price < 0:
            self.price = 0.01



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