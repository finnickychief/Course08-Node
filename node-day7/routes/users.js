const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/getUsers', (req, res) => {
  UserController.getUsers(req.query)
    .then(users => {
      res.json({
        message: 'Successfully retrieved users!',
        data: users
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not retrieve users, see error message',
        error: err
      });
    });
});

router.post('/createUser', (req, res) => {
  UserController.createUser(req.body)
    .then(result => {
      res.json({
        message: 'Successfully created user!',
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not create user, see error message',
        error: err
      });
    });
});

module.exports = router;
