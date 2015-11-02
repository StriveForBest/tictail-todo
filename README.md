# Todo app

This is an example of a Todo app, utilizing [Flask](http://flask.pocoo.org/) and [React](https://facebook.github.io/react/).

## Setup

Here are the steps to get it up and running:

### Pre-Requirements

* Git
* Postgresql
* Python
* Virtualenv

### Clone Repository

```sh
git clone git@github.com:StriveForBest/tictail-todo.git
cd tictail-todo
```

### Create Virtual Environment

```sh
virtualenv env
source env/tictail-todo/bin/activate
```

### Install Requirements

```sh
pip install -r requirements.txt
```

### Create Database

```sh
createdb todo
```

### Run Migrations

```sh
python manage.py db upgrade
```

### Install Frontend Tools

```sh
npm install
bower install
```

### Compile JS and CSS

```sh
gulp build
```

### Run Server

```sh
python run.py
```

### Now visit in your browser

<http://localhost:8000/>
