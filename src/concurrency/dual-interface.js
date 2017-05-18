'use strict';

//noinspection JSUnresolvedFunction
const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, '../data/numbers.txt');

// ability to use function as promise and callback

const readFileAsArray = function (file, cb = () => {
}) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject(err);
        return cb(err);
      }
      const lines = data.toString().trim().split('\n');
      cb(null, lines);
      resolve(lines);
    });
  });
};


readFileAsArray(file)
  .then((lines) => {
    const numbers = lines.map(Number);
    const oddNumbers = numbers.filter(number => number % 2 === 1);
    console.log(lines);
    console.log(`odd numbers count : ${oddNumbers.length}`);
  }).catch(console.error);