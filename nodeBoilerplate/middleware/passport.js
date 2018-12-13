const passport = require('passport');
const LocalStrategy = require('passport-local');
const JWTStrategy = require('passport-jwt').Strategy;
const UserController = require('../controllers/UserController');

const { jsonSecret } = require('../config/keys');

// The strategy takes in the fields it will look for to authenticate a user, then the method it will authenticate a user with.
passport.use(
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    (username, password, done) => {
      UserController.loginUser({ username, password })
        .then(result => {
          done(null, result, { message: 'Logged in Successfully' });
        })
        .catch(err =>
          done(null, false, { message: 'Incorrect email or password.' })
        );
    }
  )
);

const getCookie = req => {
  return req.cookies.jwt;
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: getCookie,
      secretOrKey: jsonSecret
    },
    (jwtPayload, callback) => {
      callback(null, jwtPayload.username);
    }
  )
);

module.exports = passport;
