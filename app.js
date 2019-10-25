const app = require('./config/server');

const listener = app.listen(8080, () => {
  console.log('server running')
});

const io = require('socket.io').listen(listener)

/** CREATE WEBSOCKET CONNECTION */
io.on('connection', function(socket) {
  console.log('User connected')

  /** DISCONNECT WEBSOCKET CONNECTION */
  socket.on('disconnect', function() {
    console.log('User disconnected')
  })
})

/**
 * When the page that has the client side file that connects with server websocket, the connection is created
 * when the page is unloaded, the connection is closed too.
 */

console.log('Port: ' + listener.address().port)