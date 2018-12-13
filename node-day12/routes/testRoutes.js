const router = require('express').Router();
const axios = require('axios');

router.get('/', (req, res) => {
  axios.get('https://jsonplaceholder.typicode.com/users').then(resp => {
    res.json(resp.data);
  });
});

module.exports = router;
