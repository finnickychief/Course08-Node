const Product = require('../models/Product');

module.exports = {
  getProduct: id => {
    // Get one product for display
    return new Promise((resolve, reject) => {
      Product.findById(id)
        .then(result => {
          resolve(result);
        })
        .catch(err => reject(err));
    });
  },
  getProducts: query => {
    // Show all products OR search for products

    const queryObj = {};
    // @TODO add in search functionality

    return new Promise((resolve, reject) => {
      Product.find(queryObj)
        .then(results => {
          resolve(results);
        })
        .catch(err => reject(err));
    });
  },
  addProduct: body => {
    // Add a single product
  },
  updateProduct: (id, body) => {
    // Edit/update a single product
  },
  deleteProduct: id => {
    // Delete a single product
  }
};
