const express = require('express');
const router = express.Router();
const { authLocal, authJWT, generateToken } = require('../middleware/auth');

/* GET home page. */
router.get('/', authJWT(), (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  res.render('index', { title: req.body.username });
});

router.get('/products', (req, res) => {
  let prodData=[
    {prodName:'Prod 1',prodDesc:'Prod 1 Desc', prodPrice:100, prodImg:'prod_1.JPG'},
    {prodName:'Prod 2',prodDesc:'Prod 2 Desc', prodPrice:110, prodImg:'prod_2.jpg'},
    {prodName:'Prod 3',prodDesc:'Prod 3 Desc', prodPrice:120, prodImg:'prod_3.jpg'},
    {prodName:'Prod 4',prodDesc:'Prod 4 Desc', prodPrice:100, prodImg:'prod_4.jpg'},
    {prodName:'Prod 5',prodDesc:'Prod 5 Desc', prodPrice:140, prodImg:'prod_5.jpg'},
    {prodName:'Prod 6',prodDesc:'Prod 6 Desc', prodPrice:140, prodImg:'prod_6.jpg'},
    {prodName:'Prod 7',prodDesc:'Prod 7 Desc', prodPrice:100, prodImg:'prod_7.jpg'},
    {prodName:'Prod 8',prodDesc:'Prod 8 Desc', prodPrice:120, prodImg:'prod_8.jpg'},
    {prodName:'Prod 9',prodDesc:'Prod 9 Desc', prodPrice:125, prodImg:'prod_9.jpg'}
  ]
  res.render('products', { title: 'Product Page',prodData: prodData});
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
