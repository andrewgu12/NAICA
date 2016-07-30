passport = require('passport')
LocalStrategy = require('passport-local').Strategy
mongoose = require('mongoose')
User = require('../models/user')

passport.use new LocalStrategy({ usernameField: 'email' }, (username, password, done) ->
	User.findOne { email: username}, (err, user) ->
		if err
			return done(err)

		if !user
			return done(null, false, message: 'User not found!')

		if !user.validPassword(password)
			return done(null, false, message: 'Invalid password')

		done null, user
)1