FROM node:16-alpine3.17

WORKDIR /app/client
COPY package.json .

RUN npm i
COPY . ./

EXPOSE 3000
CMD ["npm", "run", "start"]