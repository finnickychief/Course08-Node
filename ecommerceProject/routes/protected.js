const router = require('express').Router();

router.get('/testRoute', (req, res) => {
  res.json({ message: 'This route is protected through passport middleware!' });
});

module.exports = router;
