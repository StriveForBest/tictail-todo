import logging

from flask import redirect, render_template, url_for

from todo import app
# from todo.models import Task


logger = logging.getLogger(__name__)


@app.route('/')
def homepage():
    return redirect(url_for('todo'))


@app.route('/todo/')
def todo():
    return render_template('todo.html')
