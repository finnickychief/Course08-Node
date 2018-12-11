const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const { checkSignIn } = require('../middleware/auth');

/* GET home page. */
// With the middleware, you will go to the index page if you're signed in, or the signin page if you are not.
router.get('/', checkSignIn, (req, res, next) => {
  res.render('index', { title: 'Express', signedIn: req.session.username });
});

router.post('/', (req, res) => {
  res.render('index', {
    title: req.body.username,
    signedIn: req.session.username
  });
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/signin', (req, res) => {
  if (req.session.username) {
    res.redirect('/');
  } else {
    res.render('signin');
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy();
  res.redirect('/signin');
});

router.post('/signin', (req, res) => {
  UserController.loginUser(req.body)
    .then(result => {
      req.session.username = result.username;
      res.redirect('/');
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
