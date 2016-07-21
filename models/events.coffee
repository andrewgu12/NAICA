mongoose = require('mongoose')
Schema   = mongoose.Schema

eventSchema = new Schema(
	eventDate  : Date
	eventTime  : String
	location   : String
	title      : String
	description: String
	rsvpLink   : String
	moreInfo   : String
)

Event = mongoose.model('Event', eventSchema)
module.exports = Event