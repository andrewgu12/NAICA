express = require('express')
React = require('react')
router = express.Router()
Director = require('../models/directors')
ReactDOMServer = require('react-dom/server')
DirectorTable = require('../components/layouts/director_table.react')
DirectorBox = require('../components/generic/director.react')

# home page
router.get '/', (req, res, next) ->
	testDirector = new Director(
		name : 'Test Director'
		description : 'Test Description'
		imgSource : '/images/logo_red.png'
		title : 'Test Title'
	)
	testDirector2 = new Director(
		name : 'Test Director'
		description : 'Test Description'
		imgSource : '/images/logo_red.png'
		title : 'Test Title'
	)
	testDirector3 = new Director(
		name : 'Test Director'
		description : 'Test Description'
		imgSource : '/images/logo_red.png'
		title : 'Test Title'
	)
	testDirector4 = new Director(
		name : 'Test Director'
		description : 'Test Description'
		imgSource : '/images/logo_red.png'
		title : 'Test Title'
	)
	directorBox = ReactDOMServer.renderToString(React.createElement(DirectorBox, {director: testDirector}))
	res.render 'about/table', title: 'About Us | NAICA', director: directorBox

module.exports = router
