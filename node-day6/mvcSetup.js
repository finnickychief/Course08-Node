const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Declare routes
const quotesRouter = require('./routes/quotes');

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('MongoDB is connected');
  }
);
const app = express();
const port = 3000;

// Register middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

const printQuotes = (req, res, next) => {
  console.log('Before quotes router');
  next();
};

app.use('/quotes', printQuotes, quotesRouter);

app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.get('*', (req, res) => {
  res
    .status(404)
    .json({ message: 'Could not find the route you were looking for' });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is now running on port ${port}`);
  }
});
