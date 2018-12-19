const jwt = require('jsonwebtoken');
const passport = require('passport');

const { jsonSecret } = require('../config/keys');

const authLocal = () => {
  return passport.authenticate('local', {
    failureRedirect: '/signin',
    session: false,
    failureFlash: {
      type: 'error_msg',
      message: 'Invalid username or password.'
    }
  });
};

const authJWT = () => {
  return passport.authenticate('jwt', {
    failureRedirect: '/signin',
    session: false,
    failureFlash: {
      type: 'error_msg',
      message: 'You need to log in to view this page.'
    }
  });
};

const loggedIn = (req, res, next) => {
  if (req.cookies.jwt) {
    res.locals.signedIn = true;
  }
  next();
};

const generateToken = (req, res, next) => {
  const payload = {};

  payload.username = req.body.username;

  const token = jwt.sign(payload, jsonSecret);
  res.cookie('jwt', token);
  next();
};

module.exports = { generateToken, authLocal, authJWT, loggedIn };
