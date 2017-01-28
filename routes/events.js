require('babel-register');

const express        = require('express');
const router         = express.Router();
const moment         = require('moment');
const Event          = require('../models/events');
const React          = require('react');
const ReactDOMServer = require('react-dom/server');
const EventsList     = require('../components/layouts/events_list.react');

router.get('/', (req, res, next) => {
  const utc       = new Date().toJSON().slice(0, 10),
        todayDate = moment(utc).unix();

  Event.find((err, events) => {
    if (err)
      throw err;

    // filter for NAICA events
    let naicaEvents = events.filter((event) => {
      return event.naicaEvent;
    })

    // filter for community events
    let commEvents = events.filter((event) => {
      return (!event.naicaEvent);
    })

    commEvents  = ReactDOMServer.renderToString(React.createElement(EventsList, {events: commEvents}));
    naicaEvents = ReactDOMServer.renderToString(React.createElement(EventsList, {events: naicaEvents}));
    res.render('events/index', {title: 'Events | NAICA', commEvents: commEvents, naicaEvents: naicaEvents});
  }).where('eventDate').gte(todayDate).sort({eventDate: 1});
});

module.exports = router;
