const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const passport = require('passport');

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
    .catch(err =>
      res.status(400).render('errorPage', {
        message: `There was an error in registration, see error: ${err}`
      })
    );
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
  }),
  (req, res) => {
    return;
  }
);

module.exports = router;
