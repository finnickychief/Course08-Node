const mongoose = require('mongoose');
const moment = require('moment');
const passportLocalMongoose = require('passport-local-mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
  username: { type: String, default: '', required: true, unique: true },
  createdTimeStamp: {
    type: String,
    default: () => moment().format('dddd, MMMM Do YYYY, h:mm:ss a')
  }
});

// This tells out passport plugin how to use our data in its strategies
const options = {
  usernameField: 'username'
};

// If you want to use more than 1 field for logging in, you can use the following object:
/*
const options = {
  usernameQueryFields: ['email', 'username', 'codename']
}
*/

UserSchema.plugin(passportLocalMongoose, options); // Use passportLocalMongoose with this schema
UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', UserSchema);
