import logging

from flask import jsonify

from todo import app
from todo.models import Task


logger = logging.getLogger(__name__)


@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({'tasks': Task.query.all()})