import datetime as dt
import numpy as np
import pandas as pd, json

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, desc

from flask import Flask, jsonify, render_template


\


#################################################
# Database Setup
#################################################
engine = create_engine("sqlite:///Datasets/belly_button_biodiversity.sqlite")


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
otu_table = Base.classes.otu
Names = Base.classes.samples
metadata = Base.classes.samples_metadata



# otu_table = Base.classes.otu

# Create our session (link) from Python to the DB
session = Session(engine)
connection=engine.connect()

#################################################
# Flask Setup
#################################################
app = Flask(__name__)


#################################################
# Flask Routes
#################################################

@app.route("/")
@app.route("/index")
def index():
    return render_template('index.html')



@app.route("/names")
def names():
    #take in data from samples table in SQLite 
    nameslist=[data.key for data in Names.__table__.columns]
    #remove first row
    del nameslist[0]
    return jsonify(nameslist)



@app.route("/otu")
def otu():
    otudesc={}
    otud=session.query(otu_table.otu_id, otu_table.lowest_taxonomic_unit_found).all()
    for row in otud:
        otudesc[row[0]] = row[1]
    otudesc=list(otudesc.values())

    return jsonify(otudesc)

# # from operator import add
# from itertools import chain
# >>> import itertools
# >>> chain = itertools.chain(*list_of_menuitems)

@app.route("/metadata/<sample>")
def metadataq(sample):
    #remove BB_ as the list only contains the numbers
    mddict={}
    print(str(sample))
    for char in 'BB_':  
        sample = sample.replace(char,'')
    results = session.query(metadata.AGE, metadata.BBTYPE, metadata.ETHNICITY, 
        metadata.GENDER, metadata.LOCATION,metadata.SAMPLEID).filter_by(SAMPLEID=sample).all()[0]
    mddict = {"Age": results[0], "Type": results[1],"Ethnicity": results[2], "Gender": results[3],
     "Location": results[4],"ID": results[5]}
    return jsonify(mddict)

@app.route("/wfreq/<sample>")
def wfreq(sample):
    #remove BB_ as the list only contains the numbers
    for char in 'BB_':  
        sample = sample.replace(char,'')
    wfrequency = session.query(metadata.WFREQ).filter_by(SAMPLEID=sample).all()
    #flatten list
    wfrequency = [i[0] for i in wfrequency]
    return jsonify(wfrequency)


#Create Dataframe to retrieve data from the samples table in SQLite
SamplesDataframe=pd.read_sql_query('SELECT * FROM samples;', connection)
#Create Dynamic Name bases on URL entry '<sample>'
@app.route("/samples/<sample>")
def otucomboinfo(sample):
    #pull in ids and name; use loc to slice; sort in descending order
    sampleinfo = SamplesDataframe.loc[:,["otu_id",sample]].sort_values(sample,ascending=False)

    # use tolist to take to flatten dataset and combine it into an an array
    combo=[{'Otu Ids':sampleinfo[sample].tolist()},{'sample_values':sampleinfo['otu_id'].tolist()}]
    
    return jsonify(combo)

if __name__ == '__main__':
    app.run(debug=True)
