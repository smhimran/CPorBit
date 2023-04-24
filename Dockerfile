FROM python:3.11.2-alpine3.17

WORKDIR /app

COPY requirements.txt .

RUN apk add gcc libc-dev libffi-dev

RUN pip install -r requirements.txt

COPY . .

RUN chmod +rwx ./server.sh

RUN ./server.sh

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]