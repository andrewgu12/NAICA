express  = require('express')
moment   = require('moment')
Event    = require('../models/events')
passport = require('../config/passport.js')
router   = express.Router()

isLoggedIn = (req, res, next) ->
	console.log 'is loggedin function'
	return next() if req.isAuthenticated()
	res.redirect '/admin/login'
	return

router.get '/', isLoggedIn, (req, res, next) ->
	console.log 'admin Panel'
	res.render 'admin/index', title: 'Admin Panel | NAICA'

router.get '/login', (req, res, next) ->
	res.render 'admin/login', title: 'Login | NAICA'

# events creation
router.get '/events/add', isLoggedIn, (req, res, next) ->
 	res.render 'admin/events/add_event', title: 'Add an Event | NAICA'

router.post '/events/add', isLoggedIn, (req, res, next) ->
	title       = req.body.event_title
	location    = req.body.event_location
	dateStamp   = moment(req.body.event_date).unix()
	startTime   = req.body.event_time_start
	endTime     = req.body.event_time_end
	rsvpLink    = req.body.event_rsvp_link
	moreInfo    = req.body.event_more_info
	description = req.body.event_description
	naicaEvent  = req.body.event_group == 'NAICA'

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
		res.redirect '/admin/events/success'

router.get '/events/success', isLoggedIn, (req, res, next) ->
	res.render 'admin/events/add_success', title: 'Event Added Succesfully | NAICA'
# End events creation


router.get '/signup', (req, res, next) ->
	res.render 'admin/signup', title: 'Create a new Admin User | NAICA'

router.post '/signup', passport.authenticate('signup'
	successRedirect: '/admin'
	failureRedirect: '/admin/signup'
	failureFlash: false
)

router.post '/login', passport.authenticate('login'
	successRedirect: '/admin'
	failureRedirect: '/admin/login'
	failureFlash: false
)


module.exports = router
