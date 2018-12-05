const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.post('/', (req, res) => {
  res.render('index', { title: req.body.username });
});

module.exports = router;
