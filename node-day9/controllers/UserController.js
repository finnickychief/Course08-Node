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
      const password = userObject.password;
      // generate a salt
      bcrypt.genSalt(10, (err, salt) => {
        // Hash the password using the salt
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) {
            reject(err);
            return;
          }
          // Set the password we want to store
          userObject.password = hash;
          // Store the user object
          User.create(userObject, (err, result) => {
            err ? reject(err) : resolve(result);
          });
        });
      });
    });
  },

  loginUser: userInfo => {
    return new Promise((resolve, reject) => {
      if (!userInfo.password || !userInfo.username) {
        reject({ error: 'Some field is empty' });
        return;
      }
      // Check to see if the username is in our database
      User.findOne({ username: userInfo.username }, (err, user) => {
        console.log(err);
        // If the user was not found, reject the promise
        if (err) {
          reject(err);
          return;
        }

        if (!user) {
          reject();
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
