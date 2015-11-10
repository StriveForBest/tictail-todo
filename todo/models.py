from datetime import datetime

from sqlalchemy import func

from todo import db
from todo.utils import dump_datetime


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255), nullable=False)
    completed = db.Column(db.Boolean())
    order = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)

    __mapper_args__ = {
        "order_by": order
    }

    def __init__(self, body, completed=False, order=None):
        self.body = body
        self.completed = completed
        if not order:
            max_order_result = db.session.query(func.max(Task.order)).first()[0] or 0
            order = max_order_result + 1
        self.order = order

    def __repr__(self):
        return u'<Task({id}):: {truncated_body}{ellipsis}>'\
            .format(id=self.id,
                    truncated_body=self.body[:25],
                    ellipsis=u'...' if len(self.body) > 25 else u'')

    def serialize(self):
        """
        Return object data in easily serializeable format
        """

        return {
            'id': self.id,
            'body': self.body,
            'completed': self.completed,
            'created_at': dump_datetime(self.created_at),
            'updated_at': dump_datetime(self.updated_at),
        }
