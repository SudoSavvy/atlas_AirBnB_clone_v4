#!/usr/bin/python3
"""Flask app for HBNB with dynamic places filtering by amenities."""

from flask import Flask, render_template
from models import storage
import uuid

app = Flask(__name__)
app.url_map.strict_slashes = False


@app.teardown_appcontext
def teardown_db(exception):
    """Close the database session."""
    storage.close()


@app.route('/4-hbnb/')
def hbnb():
    """Display the HBNB page with dynamic places filtering by amenities."""
    cache_id = uuid.uuid4()  # Generate a unique cache ID
    return render_template('4-hbnb.html', cache_id=cache_id)


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
