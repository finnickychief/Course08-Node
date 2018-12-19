const Product = require('../models/Product');
const path = require('path');

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
  addProduct: (files, body) => {
    return new Promise((resolve, reject) => {
      // Add a single product
      // Save the image to the file system
      const fileObject = files.file;

      const filePath = path.join(
        __dirname,
        '../public/images/productImages/' + fileObject.name
      );

      fileObject
        .mv(filePath)
        .then(result => {
          // if the file was saved succesfully, also add the product to the database
          body.filePath = '/images/productImages/' + fileObject.name; // Get the relative filepath for where it WILL be stored relative to public. So where it will be looked for from the browser
          // Save the object to the database, with the filepath attached
          Product.create(body)
            .then(product => {
              resolve(product);
            })
            .catch(err => reject(err));
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  updateProduct: (id, body) => {
    // Edit/update a single product
  },
  deleteProduct: id => {
    // Delete a single product
  }
};
