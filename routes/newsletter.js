require('babel-register');

const express = require('express');
const fs = require('fs');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.render('newsletter/show', {title: 'Newsletter | NAICA'});
});
router.get('/:id', function (req, res) {
	var filepath = '/newsletters/'+req.params.id;
	fs.readFile(__dirname + filePath , function (err,data){
        res.contentType("application/pdf");
        res.send(data);
    });
});

module.exports = router;
