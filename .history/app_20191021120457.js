const app = require('express');

const listener = app.listen(80, () => {
  console.log('server running')
});

console.log('Port: ' + listener.address().port)