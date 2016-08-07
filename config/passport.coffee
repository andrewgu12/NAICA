passport      = require('passport')
LocalStrategy = require('passport-local').Strategy
mongoose      = require('mongoose')
User          = require('../models/user')

# login user
passport.use 'login', new LocalStrategy({ usernameField: 'email' }, (username, password, done) ->
	console.log 'admin login'
	User.findOne { email: username}, (err, user) ->
		if err
			console.log err
			return done(err)

		if !user 
			console.log 'user does not exist'
			return done(null, false, message: 'User not found!')

		if !user.validPassword(password)
			return done(null, false, message: 'Invalid password')

		done null, user
)

passport.use 'signup', new LocalStrategy({usernameField: 'email'}, (username, password, done) ->
	console.log 'admin creation'
	User.findOne { email: username}, (err, user) ->
		if (user)
			console.log 'user already exists'
			return done(err)
		else
			newUser = new User()
			newUser.email = username
			newUser.setPassword(password)
			newUser.save (err) ->
				if err
					console.log 'err: ' + err
					throw err
				console.log 'successful!'
			done null, newUser

)

passport.serializeUser (user, done) ->
	done null, user.id

passport.deserializeUser (id, done) ->
	User.findById id, (err, user) ->
		done err, user


module.exports = passport