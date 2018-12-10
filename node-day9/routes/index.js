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

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', (req, res) => {
  UserController.loginUser(req.body)
    .then(result => {
      res.render('index', { title: 'Signed in', signedIn: true });
    })
    .catch(err => {
      res.render('signin', { failure: true });
    });
});

router.get('/cookies', (req, res) => {
  res.render('example');
});

module.exports = router;
