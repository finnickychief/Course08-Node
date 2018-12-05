const mongoose = require('mongoose');
// npm i moment - Momentjs.com for info
const moment = require('moment');

const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true, default: '' },
  division: { type: String, required: true, default: 'Unorganized' },
  hometown: { type: String, required: true },
  mascot: { type: String },
  colors: { type: Array },
  createdTimeStamp: {
    type: String,
    // 'dddd, MMMM Do YYYY, h:mm:ss a'
    // 4d's - Full day(Wednesday), 4 M's full month(December), Do Date in month(5th),  4 Ys is full year (2018), h:mm:ss is clock time, a means am/pm
    // This is a callback function because we want it to be run every time an item is added, not just the once when the server is started
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('teams', TeamSchema);
