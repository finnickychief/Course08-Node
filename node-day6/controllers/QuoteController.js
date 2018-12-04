const Quote = require('../models/Quote');

module.exports = {
  addQuote: params => {
    return new Promise((resolve, reject) => {
      Quote.create(params, (err, result) => {
        // err ? reject(err) : resolve(result);

        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  getQuotes: params => {
    return new Promise((resolve, reject) => {
      Quote.find({}, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};
