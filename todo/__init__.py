import os

from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config.from_object(os.environ.get('APP_SETTINGS', 'config.DevelopmentConfig'))

db = SQLAlchemy(app)


from models import Task


@app.route('/')
def hello():
    return u'Hello World'
