const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { queryParam } = require('./middleware/middleware');

const port = 4000;
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Create a middleware that parses out the query of a url - This runs at all times no matter the route
// app.use(queryParam);

// When you provide functions as additional parameters to routes they execute from left to right
const mid1 = (req, res, next) => {
  console.log(1);
  next();
};
const mid2 = (req, res, next) => {
  console.log(2);
  next();
};
const mid3 = (req, res, next) => {
  console.log(3);
  next();
};

app.get('/', mid1, queryParam, mid2, mid3, (req, res) => {
  console.log('in route now!');
  res.json(req.query2);
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
