# Sercret Manager Server

## Set up the project

The default configuration sets up the server on the `3000` port.

## Locally with docker

1. `docker-compose up` 

### Locally

1. [Download](https://www.mongodb.com/download-center/community), install and run MongoDB locally.
2. Change `mongo:27017` to `127.0.0.1:27012` in the `src/sever/db/mongoose.js` file.
3. `npm start` 

Alternatively, change the address to another MongoDB address in the `src/server/db/mongoose.js` file.
