# multiroom-chat

## BASIC Websocket

Websocket works as a continuous connection between server and client side.

See [socket.io](http://socket.io)

### Install

To install the websocket in nodeJs we need to use the package manager npm:

```
npm i -s socket.io
```

### configuring

To configure the websocket, it must be connected to the listener returned from listen function of express object in the client side. Then must be configured in the client side importing a file configured by the socket.io lib.

#### Server Side

```JavaScript
const app = require('express')()
app.listen(8080)

const socket = require('socket.io')
const io = socket.listen(app)
```

The socket.listen function returns a server side connection object.

#### Client side

```JavaScript
<script src='/socket.io/socket.io.js'>
    socket = io('http://localhost:8080')
</script>
```

The io function returns a client side connection object too.


### Connection and Disconnect Events (SERVER SIDE)

The data exchanged between server and client sides occours by events.

To listen events we have to use the ***on*** function of the io object. An event can be defined and named as you want. 
Some events are pre-defined by the socket.io. 

Some pre-defined events are 'connection' and 'disconnect'.
The pre-defined 'connection' event answers when a connection is stabilished and the pre-defined 'disconnect' event answers when a connection is lost.

In example, imagine if you want to show in the server console when a user connect and disconnect from the websocket. The events above can be used:

```JavaScript
io.on('connection', function (socket) => {
    console.log('Client connected') 

    socket.on('disconnect', function() {
        console.log('Client disconnected')
    })
})
```

Here we have to use the io object returned from the socket.listen function to listen the events. 

### Setting Up a Global Socket Constant (SERVER SIDE)

To use the socket connection to send message to the client in the pages we want to do, we need to set up the constant with the *io* object from require('socket.io'), we need to create a global to be used in all the system.

To create a global in express just need to put the constant in the set function of express object:

```JavaScript
app.set('socket', io) // set socket constant globally
```

Then, wee need to get the constant anywhere in the system we want using the following:

```JavaScript
const socket = app.get('socket')
```

### Sending a Message and Receiving the sent Message and executing an action (ANY SIDE)

At any time we want to send a message to the other side (server <=> client) we need to use the ***emit*** function of the *io* object

Suppose we want that every time an user access the chat page, the browser shows to any user connected in the chat that someone entered. 

We can call the global socket connection to send a message in chat controller.

Example (in chat controller): 

```JavaScript
const socket = app.get('socket')
socket.emit('messageToClient', { message: 'A user has entered the chat'})
```

To send the message from server to client or client to server the method is the same!

To listen the message and take an action just use the ***on*** method explained above using the same name of the event given in the ***emit*** function.

example (in client side, chat.ejs):

```JavaScript
<script src='/socket.io/socket.io.js'>
    socket = io('http://localhost:8080')
    socket.on('messageToClient', function (dataReceived) {
        // action to do
    })
</script>
```
the dataReceived is the message sent in the emit function above and you can acess the message using the message property setted in the object passed in emit second parameter:

> dataReceived.message
