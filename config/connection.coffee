# MongoDB connection
connectionURL = ''

if process.env.NODE_ENV == 'production'
	connectionURL = process.env.MONGODB_URI
else
	connectionURL = 'localhost:27017/NAICA_DB'

module.exports = 'url' : connectionURL