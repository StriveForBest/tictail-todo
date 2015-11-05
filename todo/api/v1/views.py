# TODO:: use Flask-API <http://www.flaskapi.org>

import logging

from flask import jsonify, request, abort

from todo import app, db
from todo.models import Task


logger = logging.getLogger(__name__)


@app.route('/todo/api/v1.0/tasks', methods=['GET'])
def get_tasks():
    return jsonify({
        'status': 'success',
        'tasks': [task.serialize() for task in Task.query.all()]
    }), 200


@app.route('/todo/api/v1.0/tasks/mark-all', methods=['PUT'])
def mark_all_tasks():
    import ipdb; ipdb.set_trace()
    db.session.query(Task).update({Task.done: True})
    db.session.commit()

    return jsonify({
        'status': 'success',
        'tasks': [task.serialize() for task in Task.query.all()]
    }), 200


@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)

    # TODO:: adjust client to handle not found
    if not task:
        abort(404)
        # return jsonify({
        #     'error': 'task with id({}) not found'.format(task_id)
        # }), 200

    # TODO:: add 'success' to response
    return jsonify({
        'status': 'success',
        'task': task.serialize()
    }), 200


@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        abort(404)

    if 'completed' in request.json:
        task.done = request.json['completed']
        db.session.add(task)
        db.session.commit()

    return jsonify({
        'status': 'success',
        'task': task.serialize()
    }), 200


@app.route('/todo/api/v1.0/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    if not task:
        abort(404)

    db.session.delete(task)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'task': task.serialize()
    }), 200


@app.route('/todo/api/v1.0/tasks', methods=['POST'])
def create_task():
    if not request.json or 'body' not in request.json:
        abort(400)

    task = Task(body=request.json['body'], done=False)
    db.session.add(task)
    db.session.commit()

    return jsonify({
        'status': 'success',
        'task': task.serialize()
    }), 201
