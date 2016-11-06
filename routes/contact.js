require('babel-register');

const express    = require('express');
const postmark   = require('postmark');
const connection = require('../config/connection');
const router     = express.Router();

router.get('/', (req, res, next) => {
  console.log('/contact');
  res.render('contact', {title: 'Contact Us | NAICA'});
});

router.post('/submit', (req, res, next) => {
  const client = new postmark.Client(connection.postmarkKey);
  console.log('/contact/submit');
  client.sendEmail({
    'From':     'andrew@mingbogu.com',
    'To':       'support@naica.org',
    'Subject':  'NAICA Question!',
    'TextBody': 'Email: ' + req.body.email + '\n Message: ' + req.body.message
  }, (err, success) => {
    if (err) {
      res.send(err);
    }
    res.send(success);
  });
});

module.exports = router;
