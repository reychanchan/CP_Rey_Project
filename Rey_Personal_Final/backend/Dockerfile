FROM python:alpine AS PROD

WORKDIR /backend
COPY ./requirements.txt .
RUN pip install -r requirements.txt

ENV DEBUG=True

COPY . .
RUN python manage.py makemigrations && python manage.py migrate


CMD ["gunicorn", "--bind", "0.0.0.0:80", "--workers", "3", "dog.wsgi:application"]
# CMD ["python", "manage.py", "runserver", "0.0.0.0:80"]