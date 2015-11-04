import logging

from flask import jsonify, request, abort

from todo import app, db
from todo.models import Task


logger = logging.getLogger(__name__)


@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify(tasks=[task.serialize() for task in Task.query.all()])


@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    if not request.json or 'id' not in request.json:
        abort(400)

    task = Task.query.get(request.json['id'])

    if not task:
        # TODO:: return not found
        abort(400)

    if 'completed' in request.json:
        task.done = request.json['completed']
        db.session.add(task)
        db.session.commit()

    return jsonify({'task': task.serialize()}), 201


@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def create_task():
    if not request.json or 'body' not in request.json:
        abort(400)

    task = Task(body=request.json['body'], done=False)
    db.session.add(task)
    db.session.commit()

    return jsonify({'task': task.serialize()}), 201
