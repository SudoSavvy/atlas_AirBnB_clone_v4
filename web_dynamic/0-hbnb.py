#!/usr/bin/python3
"""Flask app for HBNB that avoids asset caching."""

from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """Close the database session."""
    storage.close()


@app.route('/0-hbnb/')
def hbnb():
    """Display the main HBNB page with cache-busting."""
    cache_id = uuid.uuid4()  # Generate a unique cache ID
    return render_template('0-hbnb.html', cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
