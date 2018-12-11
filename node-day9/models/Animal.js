const mongoose = require('mongoose');
const moment = require('moment');

const AnimalSchema = new mongoose.Schema({
  species: { type: String, required: true, default: '' },
  numLegs: { type: Number, default: 0 },
  englishName: { type: String, default: '' },
  habitat: { type: String, default: '' },
  createdTimeStamp: {
    type: String,
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('animals', AnimalSchema);
