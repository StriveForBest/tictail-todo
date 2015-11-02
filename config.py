import os
import sys


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SECRET_KEY = 'nEb7tEj1tu2olT5eR2ghep8Jam1Yif4G'

    # fallback if environment variable is not set
    if not os.environ.get('DATABASE_URL'):
        os.environ['DATABASE_URL'] = 'postgresql://localhost/todo'

    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')


class DevelopmentConfig(Config):
    DEVELOPMENT = True
    DEBUG = True


class TestingConfig(Config):
    TESTING = True


sys.stdout.write(u' * Database path: "{database_url}"\n'
                 .format(database_url=os.environ.get('DATABASE_URL')))
