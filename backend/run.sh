#!/bin/sh

python3 manage.py wait_for_db

python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py init_admin
python3 manage.py collectstatic --no-input

gunicorn app.wsgi:application --bind 0.0.0.0:8000
