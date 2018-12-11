const User = require('../models/User');

const middleware = (passport, LocalStrategy) => {
  // Tell passport to use our localstrategy, and the localstrategy to use the authentication method in passport-local-mongoose plugin
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};

module.exports = middleware;
