'use strict';

/**
 * nc localhost 8000, command to connect to the socket 
 */


let counter = 0;
const sockets = {};

const server = require('net').createServer();


const timeStamp = ()=>{
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
}

server.on('connection', socket => {
  socket.id = counter++;
  socket.write('Please type your name: ');

  socket.on('data', data => {

    if (!sockets[socket.id]) {
      socket.name = data.toString('utf8').trim();
      socket.write(`Welcome ${socket.name}!\n`);
      sockets[socket.id] = socket;
    }

    Object.entries(sockets).forEach(([key, cs]) => {
      if (socket.id == key) return;
      cs.write(`${socket.name} ${timeStamp()}: `);
      cs.write(data);
    });
  });

  socket.on('end', () => {
    delete sockets[socket.id];
    console.log('client disconnted');
  })

  // socket.setEncoding('utf8');
});


// nc localhost 8000
server.listen(8000, () => console.log('Server bound'));