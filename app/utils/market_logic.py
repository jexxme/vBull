
import random

from flask_socketio import emit



def generate_random_event(stock_simulator, socketio):
    # Example events for each category
    events = {
        'Technology': [("New tech breakthrough!", 1.2), ("Tech scandal!", 0.8)],
        'Healthcare': [("Medical breakthrough!", 1.3), ("Drug trial failure!", 0.7)],
        'Energy': [("New energy source discovered!", 1.4), ("Energy shortage!", 0.6)],
        'Food': [("New food craze!", 1.5), ("Food shortage!", 0.5)],
        'Fashion': [("New fashion trend!", 1.6), ("Fashion faux pas!", 0.4)],
        'Automotive': [("New car model!", 1.7), ("Car recall!", 0.3)]
    }

    category = random.choice(list(events.keys()))
    event, impact = random.choice(events[category])

    for stock in stock_simulator.stocks.values():
        if stock.category == category:
            stock.price *= impact

    # Emit the event message to all connected clients
    event_message = f"Random Event in {category}: {event}"
    socketio.emit('random_event', {'message': event_message})  # Removed `broadcast=True`

    return category, event

