express = require('express')
passport = require('../config/passport')
router  = express.Router()

isLoggedIn = (req, res, next) ->
	return next() if req.isAuthenticated()
	res.redirect '/admin/login'
	return

router.get '/', isLoggedIn, (req, res, next) ->
	console.log('admin panel')
	res.render 'admin/index', title: 'Admin Panel | NAICA'

router.get '/login', (req, res, next) ->
	res.render 'admin/login', title: 'Login | NAICA'

router.get '/events/add', isLoggedIn, (req, res, next) ->
 	res.render 'admin/add_event', title: 'Add an Event | NAICA'

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