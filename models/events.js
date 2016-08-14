require('babel-register');
const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const moment   = require('moment');

// today
const utc            = new Date().toJSON().slice(0, 10);
const todayTimeStamp = moment(utc).unix();

const eventSchema = new Schema({
  eventDate     : { type: Number,  default: todayTimeStamp },
  eventTimeStart: { type: String,  default: '00:00'        },
  eventTimeEnd  : { type: String,  default: '00:00'        },
  location      : { type: String,  default: ''             },
  title         : { type: String,  default: ''             },
  description   : { type: String,  default: ''             },
  rsvpLink      : { type: String,  default: ''             },
  moreInfo      : { type: String,  default: '' 			       },
  naicaEvent    : { type: Boolean, default: false          }
});

const Event    = mongoose.model('Event', eventSchema);
module.exports = Event;
