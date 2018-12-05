const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, default: '', required: true, unique: true },
  password: { type: String, default: '', required: true }
});

const User = mongoose.model('users', UserSchema);

router.get('/getUsers', (req, res) => {
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

router.post('/createUser', (req, res) => {
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

module.exports = router;
