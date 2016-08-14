require('babel-register');

const express    = require('express');
const Newsletter = require('../models/newsletters');
const router     = express.Router();

router.get('/', (req, res, next) => {
  console.log('newsletters page');
});

// saving email and write to Mailchimp
router.post('/', (req, res, next) => {

});

module.exports = router;
