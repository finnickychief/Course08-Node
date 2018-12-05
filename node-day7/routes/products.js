const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  productname: { type: String, required: true, default: '' },
  price: { type: Number, default: 0 },
  category: { type: String, default: '' },
  description: { type: String, default: '' },
  quantity: { type: Number, default: 0 }
});

const Product = mongoose.model('products', ProductSchema);

router.get('/getProducts', (req, res) => {
  Product.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});

router.post('/createProduct', (req, res) => {
  Product.create(req.body, (err, result) => {
    if (err) {
      res.json({
        message: 'Failed'
      });
    } else {
      res.json({
        message: 'Success'
      });
    }
  });
});

module.exports = router;
