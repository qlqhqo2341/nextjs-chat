// server.js
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');
const socketHandler = require("./src/server/sockerHandler")

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const app = express();
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => socketHandler.connectionHandler(io, socket));
  console.log("in", process.env.DB_HOST)


  app.use((req, res, next) => {
    req.io = io;
    next();
  })

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log('> Ready on http://localhost:3000');
  });
});
