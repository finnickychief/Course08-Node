const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

const passport = require('passport');
const { isLoggedIn, generateToken } = require('../middleware/checkAuth');

/* GET home page. */
router.get(
  '/',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/signin',
    failureFlash: {
      type: 'error_msg',
      message: 'Please sign in to view this page.'
    }
  }),
  isLoggedIn,
  (req, res, next) => {
    res.render('index', { title: 'Express' });
  }
);

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
  // Perform local authentication
  passport.authenticate('local', {
    session: false,
    failureRedirect: '/signin', // If it fails, go back to the signin page
    failureFlash: {
      type: 'error_msg',
      message: 'Invalid username or password!'
    }
  }),
  // Set token cookie to jwt authentication
  generateToken,
  // Redirect to home page
  (req, res) => {
    res.redirect('/');
  }
);

// This route will give back a jwt. First it goes to authenticate middleware, then to generateToken, then to our local function with res.json
router.post(
  '/signinjwt',
  passport.authenticate('local', { session: false }),
  generateToken,
  (req, res) => {
    res.json({ message: 'successful signin' });
  }
);

router.get('/protected', isLoggedIn, (req, res) => {
  res.json({ message: `you're allowed here!` });
});
// passport.authenticate is the same setup as above, only specifying jwt as the strategy instead of local
router.get(
  '/protectedjwt',
  passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/rejectedjwt'
  }),
  (req, res) => {
    res.json({ message: `you're allowed here!` });
  }
);
router.get('/rejectedjwt', (req, res) => {
  res.status(401).json({ message: 'you need a json token to use this route.' });
});

router.get('/signout', (req, res) => {
  // Clear their authentication token
  res.clearCookie('jwt');
  res.redirect('/signin');
});

module.exports = router;
