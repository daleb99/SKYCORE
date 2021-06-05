const { Server } = require('socket.io');

const createSocketServer = ((server) => {
  const io = new Server(server);

  io.sockets.on('connection', ((socket) => {
    console.log(`New connection: ${socket.id}`);

    socket.on('disconnect', (() => {
      console.log('Device disonnected');
    }));
  }));
});

module.exports = {
  createSocketServer,
};
