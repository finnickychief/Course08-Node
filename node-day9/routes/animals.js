const express = require('express');
const router = express.Router();
const AnimalController = require('../controllers/AnimalsController');
const { checkSignIn } = require('../middleware/auth');

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

router.get('/createAnimal', checkSignIn, (req, res) => {
  res.render('animalForm', { signedIn: req.session.username });
});

router.post('/createAnimal', checkSignIn, (req, res) => {
  AnimalController.createAnimal(req.body)
    .then(result => {
      // animal=Elephant
      // document.cookie.animal -> Elephant
      res.cookie('animal', result.englishName);
      req.session.animal = result.englishName;
      res.redirect('/');
    })
    .catch(err => {
      res.status(400).json({
        message: 'Could not add animal, see error',
        error: data
      });
    });
});

router.get('/deleteAnimal', (req, res) => {
  res.clearCookie('animal');
  req.session.animal = undefined;
  res.redirect('/');
});

module.exports = router;
