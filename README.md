# Todo app

This is an example of a Todo app, utilizing [Flask](http://flask.pocoo.org/) and [React](https://facebook.github.io/react/)

## Setup

Here are the steps to get it up and running:

### pre-equirements

* git
* postgresql
* python
* virtualenv

### clone repository

```sh
git clone git@github.com:StriveForBest/tictail-todo.git
cd tictail-todo
```

### create virtual environment

```sh
virtualenv env
source env/tictail-todo/bin/activate
```

### install requirements

```sh
pip install -r requirements.txt
```

### create database

```sh
createdb todo
```

### run migrations

```sh
python manage.py db upgrade
```

### install frontend tools

```sh
npm install
bower install
```

### compile js and css

```sh
gulp build
```

### run the server

```sh
python run.py
```

### visit in your browser

<http://localhost:8000/>
