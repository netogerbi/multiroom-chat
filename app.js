const app = require('./config/server');

const listener = app.listen(8080, () => {
  console.log('server running')
});

const io = require('socket.io').listen(listener)

/** CREATE WEBSOCKET CONNECTION */
io.on('connection', function(socket) {
  console.log('User connected');
})

console.log('Port: ' + listener.address().port)