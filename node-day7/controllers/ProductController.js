const Product = require('../models/Product');

module.exports = {
  getProducts: () => {
    return new Promise((resolve, reject) => {
      Product.find({}, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },
  createProduct: productObject => {
    return new Promise((resolve, reject) => {
      Product.create(productObject, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
};
