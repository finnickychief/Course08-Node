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

const generateToken = (req, res, next) => {
  const payload = {
    username: req.user.username
  };
  const token = jwt.sign(payload, jsonSecret, {
    expiresIn: '10m'
  });
  res.cookie('jwt', token);
  next();
};

module.exports = { generateToken, authLocal, authJWT };
