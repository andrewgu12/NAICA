connectionURL = ''

if process.env.NODE_ENV == 'production'
	connectionURL = process.env.MONGODB_URI
else
	connectionURL = '';

module.exports = 'url' : connectionURL