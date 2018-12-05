const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  division: { type: String, required: true, default: 'Unorganized' },
  hometown: { type: String, required: true },
  mascot: { type: String },
  colors: { type: Array }
});

module.exports = mongoose.model('teams', TeamSchema);
