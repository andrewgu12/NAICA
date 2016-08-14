require('babel-register');

const express    = require('express');
const config     = require('../config/connection');
const Subscriber = require('../models/subscriber');
const router     = express.Router();

// mailchimp stuff
const Mailchimp         = require('mailchimp-api-v3');
const MAILCHIMP_KEY     = config.mailchimp;
const MAILCHIMP_LIST_ID = config.mailchimpListID;
const mailchimp         = new Mailchimp(MAILCHIMP_KEY);

router.get('/', (req, res, next) => {
  console.log('newsletters page');
});

// saving email and write to Mailchimp
router.post('/', (req, res, next) => {
  const email = req.body.email_address,
        path = '/lists/' + MAILCHIMP_LIST_ID + '/members/';

  // create a new subscriber object
  const subscriber = new Subscriber({
    email: email
  });

  // make the mailchimp object
  const mcObject = {
    'email_address': email,
    'status': 'subscribed',
    'merge_fields': {
      'FNAME': '',
      'LNAME': ''
    }
  }
  // fire off mailchimp request
  mailchimp.post(path, mcObject).then((results) => {
    // if succesful, save to DB
    subscriber.save((err, savedEmail) => {
      if (err)
        throw err;
      console.log(savedEmail);
    })
  }).catch((err) => {
    console.log(err);
  })
});

module.exports = router;
