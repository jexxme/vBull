import random
from app import app
from flask_socketio import emit
from . import socketio
from app.utils.stock_simulator import StockSimulator
from flask import render_template
from .utils.market_logic import generate_random_event


@app.route('/')
def index():
    return render_template('index.html')

# Initialize your StockSimulator and add some stocks
stock_simulator = StockSimulator()
stock_simulator.add_stock('TechCorp', 100, 'Technology')
stock_simulator.add_stock('HealthPlus', 50, 'Healthcare')
stock_simulator.add_stock('GreenEnergy', 25, 'Energy')
stock_simulator.add_stock('Foodie', 75, 'Food')
stock_simulator.add_stock('Fashionista', 125, 'Fashion')
stock_simulator.add_stock('AutoTech', 150, 'Automotive')

stock_simulator.start_simulation(socketio)

def update_stock_prices():
    prices = {stock.name: stock.price for stock in stock_simulator.stocks.values()}
    socketio.emit('stock_prices', prices)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')
