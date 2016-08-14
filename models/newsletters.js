require('babel-register');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const newslettersSchema = new Schema({
  email: {type: String, default: ''}
});

const Newsletter = mongoose.model('Newsletter', newslettersSchema);
module.exports   = Newsletter;
