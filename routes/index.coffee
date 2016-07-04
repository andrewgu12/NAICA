require('babel-register')

express = require('express')
React = require('react')
ReactDOMServer = require('react-dom/server')
TestApp = require('../components/Test.react')
router = express.Router()

# home page
router.get '/', (req, res, next) ->
  markup = ReactDOMServer.renderToString(React.createElement(TestApp))
  res.render 'index', title: 'NAICA', testApp: markup

module.exports = router
