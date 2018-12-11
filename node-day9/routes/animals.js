const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/AnimalsController');

router.get('/getAnimals', (req, res) => {
  AnimalController.getAnimals()
    .then(animals => {
      res.json({
        message: 'Successfully retrieved animals!',
        data: animals
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not retrieve animals, see error',
        error: err
      });
    });
});

router.get('/createAnimal', (req, res) => {
  res.render('animalForm', { signedIn: req.session.username });
});

router.post('/createAnimal', (req, res) => {
  AnimalController.createAnimal(req.body)
    .then(result => {
      res.json({
        message: 'Successfully added animal!',
        data: result
      });
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not add animal, see error',
        error: data
      });
    });
});

module.exports = router;
