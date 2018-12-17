const router = require('express').Router();
const { authJWT } = require('../middleware/auth');
const QuoteController = require('../controllers/QuoteController');

// View as a webpage
router.get('/', (req, res) => {
  // Get the quotes
  // Send them to quotes.ejs as an array
  // In the view, do a for loop over the array to output a div for each one with the quote, name and year

  QuoteController.getQuotes()
    .then(quotes => {
      res.render('quotes', { quotes: quotes });
    })
    .catch(err => console.log(err));

  // res.render('quotes');
});

// Retrieve as JSON
router.get('/getQuotes', (req, res) => {
  QuoteController.getQuotes()
    .then(quotes => {
      res.json({ message: 'Success', data: quotes });
    })
    .catch(err => console.log(err));
});

// Add a quote
router.post('/addQuote', authJWT(), (req, res) => {
  console.log('in addQuote');
  const quoteObj = {
    text: req.body.text,
    author: req.user.username
  };

  QuoteController.addQuote(quoteObj)
    .then(success => res.redirect('/quotes/'))
    .catch(err => {
      console.log(err);
      req.flash('error_msg', err);
      res.redirect('/quotes/addQuote');
    });
});

module.exports = router;
