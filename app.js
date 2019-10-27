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


  /** On receive msg from client to server it just send againt to client */
  socket.on('msgToServer', function(data) {
    
    // send the message for self
    socket.emit('msgToClient', { nickname: data.nickname, message: data.message })

    // broadcast the message
    socket.broadcast.emit('msgToClient', { nickname: data.nickname, message: data.message })

    // verify if it is updated
    if (parseInt(data.participantsUpdated) === 0) {

      socket.emit('updateParticipantsOnClient', { nickname: data.nickname })

      socket.broadcast.emit('updateParticipantsOnClient', { nickname: data.nickname })  
    }
    
  })

})

// defining a global var... must be retrieved using get => app.get('socket')
app.set('socket', io)

/**
 * When the page that has the client side file that connects with server websocket, the connection is created
 * when the page is unloaded, the connection is closed too.
 */

console.log('Port: ' + listener.address().port)