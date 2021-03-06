const User = require('../models/User');
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
//const ExtractJwt = passportJWT.ExtractJwt;

const getCookie = req => {
  // return the cookie for the token so it can be fed into the strategy
  return req.cookies.jwt;
};

const middleware = (passport, LocalStrategy) => {
  // Tell passport to use our localstrategy, and the localstrategy to use the authentication method in passport-local-mongoose plugin
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  // JWTStrategy takes 2 parameters. First is the options object to set up the strategy
  // The second is a callback for what should happen after the verification goes through
  passport.use(
    new JWTStrategy(
      {
        // This is how you want to retrieve the JWT from the request
        //jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: getCookie, //Make a method to get the JWT from cookies,
        secretOrKey: 'super secret json stuff'
      },
      (jwtPayload, callback) => {
        // The callback takes an error and a value to pass along
        callback(null, jwtPayload.username);
      }
    )
  );
};

module.exports = middleware;
