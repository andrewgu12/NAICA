require('babel-register');

const express        = require('express');
const moment         = require('moment');
const Event          = require('../models/events');
const passport       = require('../config/passport');
const React          = require('react');
const ReactDOMServer = require('react-dom/server');
const EventsTable    = require('../components/layouts/events_table.react');
const router         = express.Router();

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

router.get('/events/', isLoggedIn, (req, res, next) => {
  const message = (req.session.message) ? req.session.message : null;
  Event.find((err, events) => {
    if (err)
      throw err;

    const eventsTable = ReactDOMServer.renderToString(React.createElement(EventsTable, {events: events}));
    res.render('admin/events/view_all', {title: 'View All Events | NAICA', eventsTable: eventsTable, message: message});
  }).where('eventDate').sort({eventDate: 1});
});

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

// get the event to edit
router.get('/events/edit/:id', isLoggedIn, (req, res, next) => {
  Event.findOne({'_id': req.params.id}, (err, event) => {
    event['dateStamp'] = moment.unix(event.eventDate).format('YYYY-MM-DD');
    res.send(event);
  }).lean();
});

// find event and update
router.post('/events/edit/', isLoggedIn, (req, res, next) => {
  const eventID        = req.body.event_id,
        name           = req.body.event_title,
        location       = req.body.event_location,
        naicaEvent     = (req.body.event_group === 'NAICA'),
        dateStamp      = moment(req.body.event_date).unix(),
        eventTimeStart = req.body.event_time_start,
        eventTimeEnd   = req.body.event_time_end,
        rsvpLink       = req.body.event_rsvp_link,
        moreInfo       = req.body.event_more_info,
        description    = req.body.event_description;

  Event.findById(eventID, (err, event) => {
    if (err)
      throw err;

    // update all fields
    event.title          = name;
    event.location       = location;
    event.naicaEvent     = naicaEvent;
    event.eventDate      = dateStamp;
    event.eventTimeStart = eventTimeStart;
    event.eventTimeEnd   = eventTimeEnd;
    event.rsvpLink       = rsvpLink;
    event.moreInfo       = moreInfo;
    event.description    = description;

    // save the event
    event.save((err, savedEvent) => {
      if (err)
        throw err;

      req.session.message = `The event (${savedEvent.title}) was updated!`;
      res.redirect('/admin/events');
    });
  });
});

// delete event
router.get('/events/delete/:id', isLoggedIn, (req, res, next) => {
  const eventID = req.params.id;

  Event.findByIdAndRemove(eventID, (err, event) => {
    req.session.message = `The event (${event.title}) was removed!`;
    res.redirect('/admin/events');
  });
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
