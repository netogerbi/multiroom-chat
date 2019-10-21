const app = require('./config/server');

const listener = app.listen(80, () => {
  console.log('server running')
});

console.log('Port: ' + listener.address().port)