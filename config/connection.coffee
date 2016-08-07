# MongoDB connection
connectionURL = ''

if process.env.NODE_ENV == 'production'
	connectionURL = process.env.MONGODB_URI
else
	connectionURL = 'localhost:27017/NAICA_DB'


# session secret
sessionSecret = 'O#jRXBi3*oyoqIs7mR'

module.exports = 
	'url' : connectionURL
	'sessionSecret': sessionSecret