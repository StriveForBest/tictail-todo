from datetime import datetime

from todo import db
from todo.utils import dump_datetime


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255))
    done = db.Column(db.Boolean())
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.now)

    def __init__(self, body, done):
        self.body = body
        self.done = done

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
            'completed': self.done,
            'created_at': dump_datetime(self.created_at),
            'updated_at': dump_datetime(self.updated_at),
        }
