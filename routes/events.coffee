express        = require('express')
router         = express.Router()
moment         = require('moment')
Event          = require('../models/events')
React          = require('react')
ReactDOMServer = require('react-dom/server')
EventsList     = require('../components/layouts/events_list.react')

# events -> get all events
router.get '/', (req, res, next) ->
	utc = new Date().toJSON().slice(0,10)
	todayDate = moment(utc).unix()
	Event.find((err, events) ->
		if err
			throw err

		# filter for naica events
		naicaEvents = events.filter (event) ->
			return event.naicaEvent

		# filter for community events
		commEvents = events.filter (event) ->
			return (!event.naicaEvent)
		
		commEvents = ReactDOMServer.renderToString(React.createElement(EventsList, {events: commEvents}))
		naicaEvents = ReactDOMServer.renderToString(React.createElement(EventsList, {events: naicaEvents}))

		res.render 'events/index', title: 'Events | NAICA', commEvents: commEvents, naicaEvents: naicaEvents
	).where('eventDate').gte(todayDate).sort({eventDate: 1}) # only get current + future events

# # Add a new event
# router.get '/add', (req, res, next) ->
# 	res.render 'events/add_event', title: 'Add an Event | NAICA'

# send in an event
router.post '/', (req, res, next) -> 
	title       = req.body.event_title
	location    = req.body.event_location
	dateStamp   = moment(req.body.event_date).unix()
	startTime   = req.body.event_time_start
	endTime     = req.body.event_time_end
	rsvpLink    = req.body.event_rsvp_link
	moreInfo    = req.body.event_more_info
	description = req.body.event_description
	naicaEvent  = (req.body.event_group == 'NAICA') ? true : false

	# create a new event object
	event = new Event(
		eventDate     : dateStamp
		eventTimeStart: startTime
		eventTimeEnd  : endTime
		location      : location
		title         : title
		description   : description
		rsvpLink      : rsvpLink
		moreInfo 	  : moreInfo
		naicaEvent 	  : naicaEvent
	)

	event.save (err, savedEvent) ->
		if err
			throw err
		res.redirect 'events/success'

# successfully added in an event
router.get '/success', (req, res, next) ->
	res.render 'events/add_success', title: 'Event Added Succesfully | NAICA'

module.exports = router