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
    origin: "http://192.168.178.34:3000",
    methods: ["GET", "POST"]
  }
});


io.engine.on("connection_error", (err) => {

});

io.on("connect", (socket) => {
  console.log("connection!");

  socket.on("message", (data) => {

    io.emit("message", data)
  })
})

httpServer.listen(process.env.PORT || 8080, () => {
  console.log("geht!")
});