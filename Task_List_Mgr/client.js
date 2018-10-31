const EE = require('events');
const readline = require('readline');

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EE();
const server = require('./server')(client);
server.on('response', (resp) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  process.stdout.write(resp);
  process.stdout.write('\n\> ');
})

let command, args;
r1.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
})