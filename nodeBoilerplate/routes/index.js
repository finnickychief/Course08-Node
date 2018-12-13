const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authLocal, authJWT, generateToken } = require('../middleware/auth');

/* GET home page. */
router.get('/', authJWT(), (req, res, next) => {
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

router.post('/signin', authLocal(), generateToken, (req, res) => {
  res.redirect('/');
});

module.exports = router;
