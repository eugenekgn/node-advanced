const EventEmitter = require('events');

class Server extends EventEmitter {

  constructor(client) {
    super();

    process.nextTick(() => {
      this.emit(
        'response',
        'Type a command (help to list commands)');
    });

    client.on('command', (command) => {
      switch (command) {
        case 'help':
        case 'add':
        case 'ls':
        case 'delete':
          this[command]();
          break;
        default:
          this.emit('response', 'unknown command');
      }
    })
  }

  help() {
    const self = this;
    self.emit('response', 'Available Commands: , add task, ls, delete :id')
  }
  add(args) {
    const self = this;
    self.emit('response', 'add....?')

  }
  ls() {
    const self = this;
    self.emit('response', 'ls....?')

  }
  delete() {
    const self = this;
    self.emit('response', 'delete....?')
  }

}

module.exports = (client) => new Server(client);