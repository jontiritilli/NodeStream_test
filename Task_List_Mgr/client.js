const EE = require('events');
const readline = require('readline');

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const client = new EE();
const server = require('./server');

r1.on('line', (input) => {
    client.emit('input', input);
})