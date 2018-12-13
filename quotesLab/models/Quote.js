const mongoose = require('mongoose');
const moment = require('moment');

const quoteSchema = new mongoose.Schema({
  text: { type: String, required: true },
  author: { type: String, default: 'Anonymous' },
  year: { type: String, default: () => moment().year() }
});

module.exports = mongoose.model('Quote', quoteSchema);
