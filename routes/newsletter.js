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
	var filepath = './public/newsletters/'+req.params.id;
	var stat = fs.stat(filepath, function(err, stat){
		if(err == null) {
	        var file = fs.createReadStream(filepath);
			res.setHeader('Content-Length', stat.size);
			res.setHeader('Content-Type', 'application/pdf');
			res.setHeader('Content-Disposition', 'attachment; filename='+req.params.id);
			file.pipe(res);
	    } else if(err.code == 'ENOENT') {
	        // file does not exist
	        res.redirect('/newsletter/');
	    } else {
	        res.redirect('/newsletter/');
	    }
	})
		

	
});

module.exports = router;
