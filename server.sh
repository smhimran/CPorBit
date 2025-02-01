#!/bin/sh

# Check if Python command exists
if command -v python3 &>/dev/null; then
    PYTHON_CMD="python3"
elif command -v python &>/dev/null; then
    PYTHON_CMD="python"
else
    echo "Python is not installed. Please install Python to run this script."
    exit 1
fi

# Run migration commands
$PYTHON_CMD manage.py makemigrations
$PYTHON_CMD manage.py migrate

# Create the "staticfiles" directory
if [ "$(uname)" == "Darwin" ] || [ "$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
    mkdir -p "public/staticfiles"
elif [ "$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" ] || [ "$(expr substr $(uname -s) 1 10)" == "MINGW64_NT" ]; then
    mkdir "public/staticfiles"
else
    echo "Unsupported operating system."
    exit 1
fi

# Run the collectstatic command
$PYTHON_CMD manage.py collectstatic --no-input
