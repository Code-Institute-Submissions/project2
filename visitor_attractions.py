from flask import Flask
from flask import render_template
from pymongo import MongoClient
import json

app = Flask(__name__)

MONGODB_HOST = 'localhost'
MONGODB_PORT = 27017
DBS_NAME = 'visitBritainKK'
COLLECTION_NAME = 'attractions'


@app.route('/')
def index():
    """
    A Flask view to serve the main dashboard page.
    """
    return render_template("index.html")

@app.route("/visitBritainKK/attractions")
def visit_attractions():
    """
    A Flask view to serve the project data from
    MongoDB in JSON format.
    """

    # A constant that defines the record fields that we wish to retrieve.
    FIELDS = {
        '_id': False, 'region': True, 'county': True,
        'cru': True, 'category': True,
        '2013_visitors': True, '2014_visitors': True,
        '2015_visitors': True, 'charge': True,
        'charge_band': True, 'size': True,
        '2011_visitors': True, '2012_visitors': True
    }

    # Open a connection to MongoDB using a with statement such that the
    # connection will be closed as soon as we exit the with statement
    with MongoClient(MONGODB_HOST, MONGODB_PORT) as conn:
        # Define which collection we wish to access
        collection = conn[DBS_NAME][COLLECTION_NAME]
        # Retrieve a result set only with the fields defined in FIELDS
        # and limit the the results to 55000
        attractions = collection.find(projection=FIELDS)
        # Convert projects to a list in a JSON object and return the JSON data
        return json.dumps(list(attractions))

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == "__main__":
    app.run(debug=True)