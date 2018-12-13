const jwt = require('jsonwebtoken');
const passport = require('passport');

const passportJWT = () => {
  return passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/signin',
    failureFlash: {
      type: 'error_msg',
      message: 'You must be signed in to view this page.'
    }
  });
};

const passportJWT2 = passport.authenticate('jwt', {
  session: false,
  failureRedirect: '/signin',
  failureFlash: {
    type: 'error_msg',
    message: 'You must be signed in to view this page.'
  }
});

const isLoggedIn = (req, res, next) => {
  // req.isAuthenticated is a method from passport that validates a user's authorization cookie
  res.locals.signedIn = true;
  next();
};

// Generate token is middleware that will be used after authentication to send a token back to the user.
const generateToken = (req, res, next) => {
  // What do we want to be sent back to the user IN ADDITION to the authorization portion of the jwt
  const payload = {
    username: req.user.username
  };

  // Sign will generate the token, incorporating our payload into the authorization portion
  const token = jwt.sign(payload, 'super secret json stuff', {
    expiresIn: '10m'
  });

  // store the token as a cookie
  res.cookie('jwt', token);

  next();
};

module.exports = { isLoggedIn, generateToken, passportJWT, passportJWT2 };
