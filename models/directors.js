const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const directorSchema = new Schema({
  name:        {type: String, default: ''},
  description: {type: String, default: ''},
  imgSource:   {type: String, default: ''},
  title:       {type: String, default: ''}
});

const Director = mongoose.model('Director', directorSchema);
module.exports = Director;
