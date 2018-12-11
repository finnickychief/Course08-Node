const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  res.render('index', { title: req.body.username });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.post('/signup', (req, res) => {
  UserController.createUser(req.body)
    .then(user => res.json({ message: 'success', data: user }))
    .catch(err => res.status(400).json({ message: 'failure', data: err }));
});

module.exports = router;
