const User = require('../models/User');

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
      User.create(userObject, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
};
