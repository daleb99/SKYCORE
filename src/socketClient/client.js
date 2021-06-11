const io = require('socket.io-client');
const config = require('../../config');

const socket = io.connect(`http://localhost:${config.default_port}`, { reconnect: true });

socket.on('connect', () => {
  console.log(socket.id);
});

socket.emit('CH01', 'me', 'test msg');
