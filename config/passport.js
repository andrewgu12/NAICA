require('babel-register');

const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose      = require('mongoose');
const User          = require('../models/user');

// login user
passport.use('login', new LocalStrategy({
  usernameField: 'email',
  session:       true
}, (username, password, done) => {
  User.findOne({
    email: username
  }, (err, user) => {
    if (err) {
      console.log(err);
      return done(err);
    }

    if (!user) {
      console.log('user does not exist');
      return done(null, false, {
        message: 'User not found!'
      });
    }

    if (!user.validPassword(password)) {
      return done(null, false, {
        message: 'Invalid password!'
      });
    }

    return done(null, {
      id:    user._id,
      email: user.email,
      name:  user.name
    });
  });
}));

// signup user
passport.use('signup', new LocalStrategy({
  username: 'email'
}, (username, password, done) => {
  User.findOne({
    email: username
  }, (err, user) => {
    if (user) {
      console.log('user already exists');
      return done(err);
    } else {
      let newUser = new User();
      newUser.email = username;
      newUser.setPassword(password);
      newUser.save((err) => {
        if (err) {
          console.log('err: ' + err);
          throw err;
        }
        console.log('successful!');
      });
      return done(null, {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
      });
    }
  });
}));

passport.serializeUser((user, done) => {
  return done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    return done(err, user);
  })
});

module.exports = passport;
