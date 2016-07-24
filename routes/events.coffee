express = require('express')
router  = express.Router()
moment = require('moment')
Event = require('../models/events')

# events -> get all events
router.get '/', (req, res, next) ->
	res.render 'events/index', title: 'Events | NAICA'

# Add a new event
router.get '/add', (req, res, next) ->
	res.render 'events/add_event', title: 'Add an Event | NAICA'

# send in an event
router.post '/', (req, res, next) -> 
	title       = req.body.event_title
	location    = req.body.event_location
	dateStamp   = moment(req.body.date).unix()
	startTime   = req.body.event_time_start
	endTime     = req.body.event_time_end
	rsvpLink    = req.body.rsvp_link
	description = req.body.event_description

	# create a new event object
	event = new Event(
		eventDate: dateStamp
		eventTimeStart: startTime
		eventTimeEnd: endTime
		location: location
		title: title
		description: description
		rsvpLink: rsvpLink
	)

	event.save (err) ->
		if err
			throw err
		console.log 'event saved!'
module.exports = router