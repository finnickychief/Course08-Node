const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const AnimalSchema = new mongoose.Schema({
  species: { type: String, required: true, default: '' },
  numLegs: { type: Number, default: 0 },
  englishName: { type: String, default: '' },
  habitat: { type: String, default: '' }
});

const Animal = mongoose.model('animals', AnimalSchema);

router.get('/getAnimals', (req, res) => {
  Animal.find({}, (err, result) => {
    res.json(
      err ? { message: 'failed' } : { message: 'success', data: result }
    );
  });
});

router.post('/createAnimal', (req, res) => {
  Animal.create(req.body, (err, result) => {
    if (err) {
      res.json({
        message: 'failed'
      });
    } else {
      res.json({
        message: 'success'
      });
    }
  });
});

module.exports = router;
