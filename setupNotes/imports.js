let importedObject = require('./exports');
let { name, magicNumber, add } = require('./exports');

console.log(
  'Hello World ' + importedObject['name'] + ' ' + importedObject['magicNumber']
);
console.log('Hello World ' + name + ' ' + magicNumber);

console.log(add(4, 5));
