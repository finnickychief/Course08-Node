const express = require('express');
const router = express.Router();
const { authLocal, authJWT, generateToken } = require('../middleware/auth');
const ProductController = require('../controllers/ProductController');

/* GET home page. */
router.get('/', (req, res) => {
  ProductController.getProducts()
    .then(prodData => {
      res.render('products', { title: 'Product Page', prodData: prodData });
    })
    .catch(err =>
      res
        .status(404)
        .render('error', { message: 'Issue retrieving products', err })
    );
});

router.post('/checkout', (req, res) => {
  console.log('in checkout');
  res.json({ message: '?' });
});

router.get('/cart', (req, res) => {
  res.render('cart');
});

router.get('/about', (req, res) => {
  res.render('about');
});

router.get('/support', (req, res) => {
  res.render('support');
});

router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/signin', (req, res) => {
  res.render('signin');
});

router.post('/signin', authLocal(), generateToken, (req, res) => {
  res.redirect('/');
});

router.get('/signout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/signin');
});

module.exports = router;
