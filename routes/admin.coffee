express = require('express')
router  = express.Router()

router.get '/', (req, res, next) ->
	console.log('admin panel')
	res.render 'admin/index', title: 'Admin Panel | NAICA'

router.get '/login', (req, res, next) ->
	console.log 'admin login'
	res.render 'admin/login', title: 'Login | NAICA'

module.exports = router