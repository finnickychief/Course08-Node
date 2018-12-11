module.exports = {
  checkSignIn: (req, res, next) => {
    if (req.session.username) {
      next(); // If they are signed in already; let them go through
    } else {
      // Otherwise, redirect them to the sign in page.
      res.redirect('/signin');
    }
  }
};
