import os

from flask.ext.migrate import Migrate, MigrateCommand
from flask.ext.script import Manager

from todo import app, db


# fallback to dev config if environment variable is not set
if not os.environ.get('APP_SETTINGS'):
    os.environ['APP_SETTINGS'] = 'config.DevelopmentConfig'

app.config.from_object(os.environ.get('APP_SETTINGS'))

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

if __name__ == '__main__':
    manager.run()
