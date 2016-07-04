express = require('express')
router = express.Router()

# home page
router.get '/', (req, res, next) ->
  res.render 'index', title: 'NAICA'

module.exports = router
