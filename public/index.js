'use strict';
import dom from './dom.js'

// Websocket
// Connect() stellt eine Websockets-Verbindung zum Server her, von dem die Webseite geladen wurde
const socket = io.connect();

// KONSTANTEN / VARIABLEN
const elements = {};

// Socket-Eventlistener
socket.on('msgFromServer', msg => {
    console.log(msg);
})

// FUNKTIONEN
const sendMsg = () => {
    socket.emit('newMsg', elements.inputMsg.value);
}

const domMapping = () => {
    elements.btnSend = dom.$('#btnSend');
    elements.inputMsg = dom.$('#inputMsg');
}

const appendEventlisteners = () => {
    elements.btnSend.addEventListener('click', sendMsg)
}

const init = () => {
    domMapping();
    appendEventlisteners();
}

// INIT
init();