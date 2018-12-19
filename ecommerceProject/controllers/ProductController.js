const Product = require('../models/Product');
const formidable = require('formidable');

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
  addProduct: (file, body) => {
    // Add a single product
    // Save the image to the file system
    // Save the object to the database, with the filepath attached
  },
  updateProduct: (id, body) => {
    // Edit/update a single product
  },
  deleteProduct: id => {
    // Delete a single product
  }
};
