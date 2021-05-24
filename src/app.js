const express = require('express');

const app = express();
const http = require('http');
const config = require('../config');

const server = http.createServer(app);

app.get('/', (req, res) => {
  res.send('Hello World');
});

server.listen(config.default_port, () => {
  console.log(`Listening on ${config.default_port}`);
});
