FROM node:20.9.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3002

EXPOSE 3002

CMD [ "npm", "start" ]