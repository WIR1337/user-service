# Description
Express server with WebSocket

CRUD api , JWT auth , Prisma 

## Installation
- Clone this repo :
```ssh
git clone git@github.com:WIR1337/user-service.git
```
- Set environment variables for Postgres and Prisma:
```ssh
cd user-service
touch server/.env

# set variable for postgres
HOST
PORT
DATABASE
USER

# set url to DB for prisma client
# https://www.prisma.io/docs/reference/database-reference/connection-urls

DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```
Create tables :

```ssh
Comming soon

```


- Run :
```ssh
npm install
```
- Then install packages for client and server
```ssh
npm run install-all
```
- Runs the client in the dev mode on port **3000** and runs the express server on port **8000**
```ssh
npm start
```
Open app [http://localhost:3000](http://localhost:3000)
