'use strict';

const fs = require('fs');
const EventEmiiter = require('events');

class WithTime extends EventEmiiter {
  execute(asyncFunc, ...args) {
    console.time('execute');
    this.emit('begin');
    asyncFunc(...args, (err, data) => {

      if (err) {
        return this.emit('error', err);
      }

      this.emit('data', data);
      console.timeEnd('execute');
      this.emit('end');
    })
  }
}

const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execution'));

withTime.on('error', console.error);

process.on('uncaughtException', (err) => {
  console.log(err);

  process.exit(1);
});

//Events do not mean sync or async

withTime.execute(fs.readFile, '');
withTime.execute(fs.readFile, __filename);