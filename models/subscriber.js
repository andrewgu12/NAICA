require('babel-register');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const subscriberSchema = new Schema({
  email: {type: String, default: ''}
});

const Subscriber = mongoose.model('Subscriber', subscriberSchema);
module.exports   = Subscriber;
