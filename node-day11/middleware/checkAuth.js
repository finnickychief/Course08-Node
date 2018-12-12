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

module.exports = isLoggedIn;
