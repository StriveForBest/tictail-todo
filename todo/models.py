import datetime

from todo import db


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String(255))
    done = db.Column(db.Boolean())
    created_at = db.Column(db.DateTime, default=datetime.datetime.now)
    updated_at = db.Column(db.DateTime, onupdate=datetime.datetime.now)

    def __init__(self, body, done):
        self.body = body
        self.done = done

    def __repr__(self):
        return u'<Task({id}):: {truncated_body}{ellipsis}>'\
            .format(id=self.id,
                    truncated_body=self.body[:25],
                    ellipsis=u'...' if len(self.body) > 25 else u'')
