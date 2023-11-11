FROM node:20.9.0

WORKDIR /usr/src/app

COPY ./server/package*.json ./
COPY ./client-1/package*.json ./
COPY ./client-1/package*.json ./

RUN npm install

COPY ./server/ .
COPY ./client-1/ .
COPY ./client-1/ .


ENV PORT=8000

EXPOSE 8000

RUN npx prisma generate

CMD [ "npm","start" ]