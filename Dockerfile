FROM python:3.11.11-alpine3.19

WORKDIR /app

COPY requirements.txt .

RUN apk add --no-cache \
    gcc \
    g++ \
    gfortran \
    libc-dev \
    libffi-dev \
    musl-dev \
    make \
    openblas-dev

ENV BLAS=OPENBLAS \
    LAPACK=OPENBLAS


RUN pip install --no-cache-dir -r requirements.txt

COPY . .

RUN chmod +x ./server.sh

RUN ./server.sh

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]