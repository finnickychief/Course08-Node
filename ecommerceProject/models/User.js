const mongoose = require('mongoose');
const moment = require('moment');

const UserSchema = new mongoose.Schema({
  username: { type: String, default: '', required: true, unique: true },
  password: { type: String, default: '', required: true },
  createdTimeStamp: {
    type: String,
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

module.exports = mongoose.model('users', UserSchema);
