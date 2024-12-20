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
    openblas-dev \
    bash \
    dos2unix

ENV BLAS=OPENBLAS \
    LAPACK=OPENBLAS


RUN pip install --no-cache-dir -r requirements.txt

COPY . .

COPY server.sh /app/server.sh

# Fix Windows line endings and make the script executable
RUN dos2unix /app/server.sh
RUN chmod +x /app/server.sh

# Create staticfiles directory
RUN mkdir -p /app/staticfiles

# Run the script
RUN /bin/bash /app/server.sh

EXPOSE 8000

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
