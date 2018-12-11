module.exports = {
  attachLocals: (req, res, next) => {
    if (req.user) {
      // req.user is the user that is currently logged in. If they are logged in, use the locals storage to flip the buttons
      res.locals.signedIn = true;
    }
    next();
  }
};
