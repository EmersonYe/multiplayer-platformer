const express = require('express');

// Setup and Express server
const app = express();

app.use(express.static('public'));
const server = app.listen(process.env.PORT || 3000);

// Setup socket.io
const io = require('socket.io')(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

// Listen for socket.io connections
io.on('connection', socket => {
    console.log('Player connected!', socket.id);
})