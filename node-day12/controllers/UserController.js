const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
  getUsers: query => {
    let queryObj = {};

    if (query.username) {
      queryObj.username = query.username;
    }
    return new Promise((resolve, reject) => {
      User.find(queryObj, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },
  createUser: userObject => {
    return new Promise((resolve, reject) => {
      // register is a method added to the schema with passport-local-mongoose
      // this takes in 2 parameters: the first is a user schema, the second is the password
      User.register(
        new User({ username: userObject.username }),
        userObject.password
      )
        .then(user => resolve(user))
        .catch(err => reject(err));
    });
  },

  loginUser: userInfo => {
    return new Promise((resolve, reject) => {
      // Check to see if the username is in our database
      User.findOne({ username: userInfo.username }, (err, user) => {
        // If the user was not found, reject the promise
        if (err) {
          reject(err);
          return;
        }

        // Compare the passwords
        bcrypt.compare(userInfo.password, user.password, (err, result) => {
          // If there is an error, reject the promise
          if (err) {
            reject(err);
            return;
          }

          // The result is the result of the comparison. If it is true, the passwords match. If it false, the passwords do not match
          if (result) {
            resolve(user);
          } else {
            reject(err);
          }
        });
      });
    });
  }
};
