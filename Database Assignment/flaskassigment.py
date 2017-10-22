import numpy as np
from flask import Flask, jsonify
import pandas as pd
import sqlalchemy
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from sqlalchemy.ext.automap import automap_base
import datetime as dt
from flask import Flask, jsonify


from config import gle_sql_server_info
google_sql_server= gle_sql_server_info

#################################################
# Database Setup
#################################################
engine = create_engine(google_sql_server)

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
station = Base.classes.stationclass
measurement = Base.classes.measurementclass

# Create our session (link) from Python to the DB
session = Session(engine)

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################


@app.route("/")
def welcome():
    """List all available api routes."""
    return (
        f"Available Routes:<br/>"
        f"/api/v1.0/stations<br/>"
        f"/api/v1.0/measurements<br/>"
        f"/api/v1.0/precipitation<br/>"
        f"/api/v1.0/tobs<br/>"
        f"/api/v1.0/date<br/>"
    )

dictionary={}

@app.route("/api/v1.0/stations")
def stations():
    results = session.query(stationclass).all()
    return(station_names)

@app.route("/api/v1.0/measurements")
def stations():
    results = session.query(measurementclass).all()
    return(station_names)

@app.route("/api/v1.0/precipitation")
def precipitation():
    results=session.query(measurementclass.date, measurementclass.precipitation.filter(measurementclass.date.between('2016-01-01', '2016-12-31').all()
    all_prcp = []
    for value in results:
        print(measurementclass.prcp)
        prcp_dict = {}
        prcp_dict["station"] = measurementclass.station
        prcp_dict["prcp"] = measurementclass.prcp
        prcp_dict["date"] = measurementclass.date
        all_prcp.append(prcp_dict)
    return jsonify(all_prcp)


@app.route("/api/v1.0/tobs)
def tobs():
    results=session.query(measurementclass.tobs).filter(measurementclass.date.between('2016-01-01', '2016-12-31').all()
    all_tobs = []
    for value in results:
        print(measurementclass.prcp)
        tobs_dict = {}
        tobs_dict["station"] = measurementclass.station
        tobs_dict["prcp"] = measurementclass.tobs
        tobs_dict["date"] = measurementclass.date
        all_tobs.append(passenger_dict)
    return jsonify(all_tobs)

if __name__ == '__main__':
    app.run(debug=True)
