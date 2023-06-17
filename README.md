# CPorBit

## Instructions to run
 ### Using Docker
 - Install [docker](https://www.docker.com/) (if you haven't yet)
 - copy the `env.example` file to a file named `.env`
 - Update the necessary environment variables
 - Run the application
```bash
 docker-compose up 
 ```
The application will be available on [localhost](http://localhost/).

### Nope, we go the old ways

#### Server
- Create virtualenv

- Install dependencies

```bash
pip install -r requirements.txt
```

- Create a .env file from env.example

```bash
cp env.example ./.env
```
for windows, use this command instead
```cmd
copy env.example .\.env
```

- Run the server

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

#### Client

- Move to the client directory

```bash
cd client
```

- Install dependencies

```bash
npm install
```

or, using yarn

```bash
yarn install
```

- Start the development version

```bash
npm run start
```

or, using yarn

```bash
yarn start
```
