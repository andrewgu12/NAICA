mongoose = require('mongoose')
Schema   = mongoose.Schema
moment   = require('moment')

# today
utc = new Date().toJSON().slice(0, 10)
todayTimeStamp = moment(utc).unix()

eventSchema = new Schema(
	eventDate     : { type: Number,  default: todayTimeStamp }
	eventTimeStart: { type: String,  default: '00:00'        }
	eventTimeEnd  : { type: String,  default: '00:00'        }
	location      : { type: String,  default: ''             }
	title         : { type: String,  default: ''             }
	description   : { type: String,  default: ''             }
	rsvpLink      : { type: String,  default: ''             }
	moreInfo      : { type: String,  default: '' 			 }
	naicaEvent    : { type: Boolean, default: false          }
)

Event = mongoose.model('Event', eventSchema)
module.exports = Event