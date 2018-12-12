const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const passport = require('passport');
const isLoggedIn = require('../middleware/checkAuth');

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
    .then(user => res.redirect('/'))
    .catch(err => {
      req.flash('error_msg', 'That username or password is invalid!');
      res.redirect('/signup');
    });
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post(
  '/signin',
  passport.authenticate('local', {
    successRedirect: '/', // If successful, go to root page
    failureRedirect: '/signin', // If it fails, go back to the signin page
    failureFlash: {
      type: 'error_msg',
      message: 'Invalid username or password!'
    }
  })
);

router.get('/protected', isLoggedIn, (req, res) => {
  console.log(req.user);
  res.json({ message: `you're allowed here!` });
});

router.get('/signout', (req, res) => {
  console.log(req.user);
  req.logout();
  res.redirect('/');
});

module.exports = router;
