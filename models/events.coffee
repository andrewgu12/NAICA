mongoose = require('mongoose')
Schema   = mongoose.Schema

eventSchema = new Schema(
	eventDate     : Number
	eventTimeStart: String
	eventTimeEnd  : String
	location      : String
	title         : String
	description   : String
	rsvpLink      : String
)

Event = mongoose.model('Event', eventSchema)
module.exports = Event