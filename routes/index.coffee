require('babel-register')

express = require('express')
React = require('react')
ReactDOMServer = require('react-dom/server')
router = express.Router()

# home page
router.get '/', (req, res, next) ->
  res.render 'index', title: 'NAICA'

module.exports = router
