const { Server } = require('socket.io');

const createSocketServer = ((server) => {
  const io = new Server(server);

  io.sockets.on('connection', ((socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('disconnect', (() => {
      console.log('Device disonnected');
    }));
  }));

  io.sockets.on('attempt-connect', ((socket) => {
    console.log('Someone tried to connect');
  }));
});

module.exports = {
  createSocketServer,
};
