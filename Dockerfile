FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
COPY . .
RUN npm install && npx sequelize db:migrate

EXPOSE 8080
CMD [ "node", "server.js" ]
