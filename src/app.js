const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const vatsimAPI = require('./methods/vatsim-api');
const config = require('../config');
const dbConfig = require('../dbConfig');

const app = express();
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

mongoose.connect(dbConfig.DB_CONNECTION, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(() => {
  console.log('Successfully connected to MognoDB');
}).catch((error) => {
  console.log(`MongoDB connection Error ${error}`);
});
