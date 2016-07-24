require('babel-register')

express = require('express')
React = require('react')
router = express.Router()

# home page
router.get '/', (req, res, next) ->
  res.render 'index', title: 'NAICA'

router.get '/about', (req, res, next) ->
  res.render 'about/table', title: 'About Us | NAICA'

module.exports = router
