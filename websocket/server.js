'use strict';

const { log } = require('console');
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
  console.log(err.req);      // the request object
  console.log(err.code);     // the error code, for example 1
  console.log(err.message);  // the error message, for example "Session ID unknown"
  console.log(err.context);  // some additional error context
});

io.on("connect", (socket) => {
  console.log("connection!!!!!");

  socket.on("message", (data) => {
    console.log("MESSAGE", data);
    io.emit("message", data)
  })
})

httpServer.listen(8080, '192.168.178.34', () => {
  console.log("geht!")
});