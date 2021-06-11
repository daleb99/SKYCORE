import { io } from 'socket.io-client';

function makeConnection() {
  const socket = io();

  socket.on('attempt-connect', () => {
    console.log(socket.id);
  });

  console.log('Tried to make a connection');
}

module.exports = { makeConnection };
