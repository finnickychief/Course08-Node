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

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true, default: '' },
  price: { type: Number, default: 0 },
  category: { type: String, default: '' },
  description: { type: String, default: '' },
  quantity: { type: Number, default: 0 }
});

const AnimalSchema = new mongoose.Schema({
  species: { type: String, required: true, default: '' },
  numLegs: { type: Number, default: 0 },
  englishName: { type: String, default: '' },
  habitat: { type: String, default: '' }
});

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  division: { type: String, required: true, default: 'Unorganized' },
  hometown: { type: String, required: true },
  mascot: { type: String },
  colors: { type: Array }
});

// After you have your schema defined, you have to register it with mongoose so it knows what to look for. the first parameter is what you want the collection to be called in the database. The second is the schema you want to represent records within that collection
const User = mongoose.model('users', UserSchema);
const Product = mongoose.model('products', ProductSchema);
const Animal = mongoose.model('animals', AnimalSchema);
const Team = mongoose.model('teams', TeamSchema);

const app = express();
const port = 3000;

// Register middleware
app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ message: 'success' });
});

app.get('/users/getUsers', (req, res) => {
  let queryObj = {};

  if (req.query.username) {
    queryObj.username = req.query.username;
  }

  User.find(queryObj, (err, result) => {
    if (err) {
      res.status(400).json({
        confirmation: 'Failure',
        message: err
      });
    } else {
      result = result.map(user => user.username);

      res.json({
        users: result,
        confirmation: 'Success'
      });
    }
  });
});

app.get('/products/getProducts', (req, res) => {
  Product.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});
app.get('/animals/getAnimals', (req, res) => {
  Animal.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});
app.get('/teams/getTeams', (req, res) => {
  Team.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});

app.post('/users/createUser', (req, res) => {
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

app.post('/products/createProduct', (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) {
      res.json({
        message: 'Failed'
      });
    } else {
      res.json({
        message: 'Success'
      });
    }
  });
});

app.post('/animals/createAnimal', (req, res) => {
  Animal.create(req.body, (err, result) => {
    if (err) {
      res.json({
        message: 'failed'
      });
    } else {
      res.json({
        message: 'success'
      });
    }
  });
});

app.post('/teams/createTeam', (req, res) => {
  Team.create(req.body, (err, result) => {
    res.json(err ? { message: 'failed' } : { message: 'success' });
    // if (err) {
    //   res.json({ message: 'Failed' });
    // } else {
    //   res.json({ message: 'Success' });
    // }
  });
});

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is now running on port ${port}`);
  }
});
