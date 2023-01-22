# CPorBit

## Instructions to run

### Server

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

### Client

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
