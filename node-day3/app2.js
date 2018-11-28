// Fulfill exercise here

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 4000;

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Calculate sum and assign it to req

  const array = req.body.array;

  let sum = array.reduce((acc, item) => acc + item);
  // for(let i = 0; i < array.length; i++){
  //   sum += array[i];
  // }

  req.sum = sum; // Pass sum along with the request object

  next();
});

app.use('*', (req, res) => {
  console.log('in route where we will send');

  let obj = {
    sum: req.sum,
    message: 'Success!'
  };

  res.json(obj);
});

app.listen(port, err => {
  err ? console.log(err) : console.log('Listening');
});
