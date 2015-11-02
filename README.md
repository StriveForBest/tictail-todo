# pre-requirements
git
postgresql
python
virtualenv

# clone repository
git clone git@github.com:StriveForBest/tictail-todo.git
cd tictail-todo

# create virtual environment
virtualenv env
source env/tictail-todo/bin/activate

# install requirements
pip install -r requirements.txt

# create database
createdb todo

# run migrations
python manage.py db upgrade


npm install -g gulp
$ pip install -r requirements.txt
$ npm install
$ bower install
