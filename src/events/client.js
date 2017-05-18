'use strict';

const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client);

server.on('response', (response) => {
  console.log(`Reponse: ${response}`);
  // recieve next line
  process.stdout.write('\n\> ');
});

rl.on('line', (input) => {
  client.emit('command', input);
})