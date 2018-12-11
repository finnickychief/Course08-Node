const Animal = require('../models/Animal');

module.exports = {
  getAnimals: () => {
    return new Promise((resolve, reject) => {
      Animal.find({}, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  },
  createAnimal: animalObject => {
    return new Promise((resolve, reject) => {
      Animal.create(animalObject, (err, result) => {
        err ? reject(err) : resolve(result);
      });
    });
  }
};
