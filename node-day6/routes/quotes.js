const express = require('express');
const router = express.Router();

// A router is a way to bundle up routes into an individual middleware that can be attached to your application(or other routers)

// Full route for this route is /quotes/getQuote
router.get('/getQuote', (req, res) => {
  console.log('In getQuote');
  res.json({ quote: 'Knowledge is Power, France is Bacon' });
});

router.get('/getQuote2', (req, res) => {
  console.log('In getQuote2');
  res.json({ quote: 'There are three things a wise man fears' });
});

router.get('/*', (req, res) => {
  console.log('in 404');
  res
    .status(404)
    .json({ quote: 'Error: This is not the quote you are looking for.' });
});

module.exports = router;
