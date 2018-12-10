const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/getProducts', (req, res) => {
  ProductController.getProducts()
    .then(products => {
      res.json({
        message: 'Successfully retrieved products!',
        data: products
      });
    })
    .catch(err => {
      res.json({
        message: 'Could not retrieve products, see error',
        error: err
      });
    });
});

router.get('/createProduct', (req, res) => {
  res.render('createProduct');
});

router.post('/createProduct', (req, res) => {
  ProductController.createProduct(req.body)
    .then(result => {
      res.json({
        message: 'Successfully created product!',
        data: result
      });
    })
    .catch(err => {
      res.json({
        message: 'Could not create product, see error message',
        error: err
      });
    });
});

module.exports = router;
