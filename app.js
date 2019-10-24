const app = require('./config/server');

const listener = app.listen(8080, () => {
  console.log('server running')
});

console.log('Port: ' + listener.address().port)