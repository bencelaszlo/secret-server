# Sercret Manager Server

## Set up the project

The default configuration sets up the server on the `3000` port.

## Locally with docker

1. `docker-compose up` 

### Locally

1. Change `mongo:27017` to `127.0.0.1:27012` in `src/sever/db/mongoose.js` file.
2. `npm start` 
