# MongoDB connection
connectionURL = ''

if process.env.NODE_ENV == 'production'
	connectionURL = process.env.MONGODB_URI
else
	connectionURL = 'localhost:27017/NAICA_DB'


# session secret
if process.env.NODE_ENV == 'production'
	sessionSecret = process.env.SESSION_SECRET
else
	sessionSecret = 'naicaforlife'


module.exports = 
	'url' : connectionURL
	'sessionSecret': sessionSecret