# About


## Run it with Docker
- Running with docker-compose :
```ssh
version: '3'
services:
  postgres:
    image: 'wir1337/my-db:1.0'
    environment: 
      - POSTGRES_PASSWORD=qwe123
    container_name: postgres-db
  server:
    depends_on:
      - postgres
    image: wir1337/server:1.0
    ports:
      - "8000:8000"
    container_name: server
  client-1:
    depends_on:
      - server
    image: wir1337/client-1:1.0
    ports:
      - "3001:3001"
    container_name: client-1
  client-2:
    depends_on:
      - server
    image: wir1337/client-2:1.0
    ports:
      - "3002:3002"
    container_name: client-2
```
- Then open
client-1 [http://localhost:3001](http://localhost:3001)
client-2 [http://localhost:3002](http://localhost:3002)
