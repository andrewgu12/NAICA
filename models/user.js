// User Model - schema + methods for setting and validating password
require('babel-register');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const crypto   = require('crypto');

const userSchema = new Schema({
  email: {
    type:     String,
    unique:   true,
    required: true
  },
  name: {type: String, default: ''},
  hash: {type: String, default: ''},
  salt: {type: String, default: ''}
});

userSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

userSchema.methods.validPassword = function(password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};

const User     = mongoose.model('User', userSchema);
module.exports = User;
