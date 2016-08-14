require('babel-register');

const express  = require('express');
const moment   = require('moment');
const Event    = require('../models/events');
const passport = require('../config/passport');
const router   = express.Router();

const isLoggedIn = (req, res, next) => {
  console.log('isLoggedIn function');
  if (req.isAuthenticated())
    return next();
  res.redirect('/admin/login');
};

// home page
router.get('/', isLoggedIn, (req, res, next) => {
  console.log('admin panel');
  res.render('admin/index', {title: 'Admin Panel | NAICA'});
});

// login page
router.get('/login', (req, res, next) => {
  res.render('admin/login', {title: 'Login | NAICA'});
});

/***********
* Events
**********/

// events creation
router.get('/events/add', isLoggedIn, (req, res, next) => {
  res.render('admin/events/add_event', {title: 'Add an Event | NAICA'});
});

router.post('/events/add', isLoggedIn, (req, res, next) => {
  const title       = req.body.event_title,
        location    = req.body.event_location,
        dateStamp   = moment(req.body.event_date).unix(),
        startTime   = req.body.event_time_start,
        endTime     = req.body.event_time_end,
        rsvpLink    = req.body.event_rsvp_link,
        moreInfo    = req.body.event_more_info,
        description = req.body.event_description,
        naicaEvent  = (req.body.event_group === 'NAICA');

  // create new event object
  const event = new Event({
    eventDate:      dateStamp,
    eventTimeStart: startTime,
    eventTimeEnd:   endTime,
    location:       location,
    title:          title,
    description:    description,
    rsvpLink:       rsvpLink,
    moreInfo:       moreInfo,
    naicaEvent:     naicaEvent
  });

  event.save((err, savedEvent) => {
    if(err)
      throw err;

    res.redirect('/admin/events/success');
  });
})

router.get('/events/success', isLoggedIn, (req, res, next) => {
  res.render('admin/events/add_success', {title: 'Event Added Succesfully | NAICA'});
});


/**************************
 * Login, Logout, Register
 *************************/
router.get('/signup', (req, res, next) => {
  res.render('admin/signup', {title: 'Create an Admin User | NAICA'});
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/admin',
  failureRedirect: '/admin/signup',
  failureFlash: false
}));

router.post('/login', passport.authenticate('login', {
  successRedirect: '/admin',
  failureRedirect: '/admin/login',
  failureFlash: false
}));

router.get('/logout', isLoggedIn, (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});

module.exports = router;
