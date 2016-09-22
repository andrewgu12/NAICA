require('babel-register');

const express    = require('express');
const nodemailer = require('nodemailer');
const router     = express.Router();

router.get('/', (req, res, next) => {
  console.log('/contact');
  res.render('contact', {title: 'Contact Us | NAICA'});
});

router.post('/submit', (req, res, next) => {
  // create transporter object
  console.log('/contact/submit');
  const transporter = nodemailer.createTransporter({
    service: 'Gmail',
    auth: {
      user: 'andrew.m.gu@gmail.com',
      pass: 'gyst123119'
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'andrew.m.gu@gmail.com',
    subject: 'NAICA Question!',
    message: req.body.message
  };
  console.log(transporter);
  console.log(mailOptions);
  transporter.sendMail(mailOptions, function(err, info) {
    console.log(err);
    console.log(info);
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  })
  res.send('Done!');
});

module.exports = router;
