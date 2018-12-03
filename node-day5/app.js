const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

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

// Mongoose allows you to define Schema(blueprints) for the structure of the data you want to store. These are what the documents within your mongo database will look like
const UserSchema = new mongoose.Schema({
  username: { type: String, default: '', required: true, unique: true },
  password: { type: String, default: '', required: true }
});

// After you have your schema defined, you have to register it with mongoose so it knows what to look for. the first parameter is what you want the collection to be called in the database. The second is the schema you want to represent records within that collection
const User = mongoose.model('users', UserSchema);

const app = express();
const port = 3000;

// Register middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.post('/createUser', (req, res) => {
  let { user } = req.body;

  User.create(user, (err, result) => {
    if (err) {
      res.status(400).json({
        message: err,
        confirmation: 'Failure'
      });
    } else {
      res.json({
        data: result,
        confirmation: 'Success'
      });
    }
  });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is now running on port ${port}`);
  }
});
