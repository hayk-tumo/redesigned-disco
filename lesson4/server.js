const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const messages = [];

app.use(express.static('.'));

app.get('/', (req, res) => {
  res.redirect('index.html');
});

io.on('connection', (socket) => {
  for (const message of messages) {
    socket.emit('display message', message);
  }

  socket.on('send message', (data) => {
    messages.push(data);
    io.sockets.emit('display message', data);
  });
});

server.listen(3000);
