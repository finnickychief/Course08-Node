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
  if (req.session.username) {
    res.render('index', { title: 'home page' });
  } else {
    res.render('signin');
  }
});

router.post('/destroySignin', (req, res) => {
  req.session.username = undefined;
  res.json({ message: 'succesfully cleared user' });
});

router.post('/signin', (req, res) => {
  UserController.loginUser(req.body)
    .then(result => {
      req.session.username = result.username;
      res.render('index', { title: 'Signed in', signedIn: true });
    })
    .catch(err => {
      res.render('signin', { failure: true });
    });
});

router.get('/cookies', (req, res) => {
  // console.log(req.cookies);
  res.cookie('test', 'Value');

  if (req.cookies.name === 'Jeff') {
    res.cookie('name', 'Bob', { maxAge: '5000' });
  } else {
    res.cookie('name', 'Jeff', { maxAge: '5000' });
  }

  //res.cookie('name', 'Jeff');
  res.render('example');
});
router.get('/cookies2', (req, res) => {
  res.clearCookie('test');

  res.render('example');
});

router.get('/session', (req, res) => {
  if (req.session.views) {
    req.session.views++;
    res.render('sessionExample', { views: req.session.views });
  } else {
    req.session.views = 1;
    res.render('sessionExample', { views: req.session.views });
  }
});

module.exports = router;
