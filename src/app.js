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
// app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

/* IMPORT ROUTES */
const keygenRoute = require('./routes/keygen');

app.use('/keygen', keygenRoute);

io.on('connection', (socket) => {
  console.log('A user connected');
});

server.listen(config.default_port, () => {
  console.log(`Listening on ${config.default_port}`);
});
