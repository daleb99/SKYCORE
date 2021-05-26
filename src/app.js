const express = require('express');

const app = express();
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const config = require('../config');

const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(config.default_port, () => {
  console.log(`Listening on ${config.default_port}`);
});
