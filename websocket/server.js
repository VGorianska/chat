'use strict';

const {
  log
} = require('console');
const cors = require('cors');
// Express
const express = require('express');
let expressServer = express();
expressServer.use(express.static('public'));
expressServer.use(cors());

// HTTP-SERVER
const http = require('http');
let httpServer = http.Server(expressServer);

// Socket
const socketIo = require('socket.io');
let io = socketIo(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

io.on("connect", (socket) => {

  socket.on("newMsg", (data) => {
    io.emit("msg", data)
  })
})

httpServer.listen(8080, () => {
  console.log("geht!")
});