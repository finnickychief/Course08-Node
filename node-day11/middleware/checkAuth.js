const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  // req.isAuthenticated is a method from passport that validates a user's authorization cookie
  if (req.isAuthenticated()) {
    // If they are signed in, let them through
    res.locals.signedIn = true;
    next();
    return;
  } else {
    // Otherwise, kick them to the sign in page.
    req.flash('error_msg', 'Sign up or sign in to see this page');
    res.redirect('/signin');
  }
};

// Generate token is middleware that will be used after authentication to send a token back to the user.
const generateToken = (req, res, next) => {
  // What do we want to be sent back to the user IN ADDITION to the authorization portion of the jwt
  const payload = {
    username: req.user.username
  };

  // Sign will generate the token, incorporating our payload into the authorization portion
  const token = jwt.sign(payload, 'super secret json stuff');
  // Send the token to the user
  res.json({ token: token });
};

module.exports = { isLoggedIn, generateToken };
