require('babel-register');

const express = require('express');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('index', {title: 'NAICA'});
});

module.exports = router;
