const express = require('express');
const router = express.Router();
const { addQuote, getQuotes } = require('../controllers/QuoteController');

// Full route for this route is /quotes/getQuote
router.get('/getQuotes', (req, res) => {
  getQuotes()
    .then(result => {
      res.json({
        message: 'Success',
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failure',
        error: err
      });
    });
});

router.post('/addQuote', (req, res) => {
  addQuote(req.body)
    .then(result => {
      res.json({
        message: 'Success',
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Failure',
        error: err
      });
    });
});

router.get('/*', (req, res) => {
  console.log('in 404');
  res
    .status(404)
    .json({ quote: 'Error: This is not the quote you are looking for.' });
});

module.exports = router;
