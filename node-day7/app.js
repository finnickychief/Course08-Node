const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// Import routers
const teamRouter = require('./routes/teams');
const userRouter = require('./routes/users');
const productRouter = require('./routes/products');
const animalRouter = require('./routes/animals');

// mongoose.connect takes 3 parameters: the url(including the database name), the options, and a callback for what should happen after it runs
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

// Initialize app server
const app = express();
const port = 3000;

// Register middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

// Register routes
app.use('/teams', teamRouter);
app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/animals', animalRouter);

// Handle base route
app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

// Set server to listen on a port
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is now running on port ${port}`);
  }
});
