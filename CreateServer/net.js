process.stdout.write('\u001B[2J\u001B[0;0f');

const app = require('net').createServer();

app.on('connection', socket => {
  console.log('Client connected');
  socket.write(`Welcome new client!\n`);
  socket.on('data', data => {
    console.log(`data is: ${data}`);
    socket.write(`data is: `);
    socket.write(`${data}`);
  });

  socket.setEncoding('utf8');
});

app.listen(
  8000,
  () => console.log('server bound')
);