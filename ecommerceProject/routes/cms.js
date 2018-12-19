const router = require('express').Router();
const path = require('path');

router.get('/', (req, res) => {});

router.get('/addProduct', (req, res) => {});

router.post('/addProduct', (req, res) => {});

router.get('/editProduct', (req, res) => {});

router.post('/editProduct', (req, res) => {});

router.delete('/deleteProduct', (req, res) => {});

router.get('/testForm', (req, res) => {
  res.render('fileExample');
});

router.post('/testForm', (req, res) => {
  console.log(req.files.image);
  console.log(req.body.text);

  let sampleFile = req.files.image;

  let filePath =
    path.join(__dirname, '../public/images/productImages/') + sampleFile.name;
  console.log(filePath);
  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(filePath, function(err) {
    if (err) return res.status(500).send(err);

    res.send('File uploaded!');
  });

  // res.send('After console log');
});

module.exports = router;
