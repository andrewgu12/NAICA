require('babel-register');

let connectionURL = '',
		sessionSecret = '';

if (process.env.NODE_ENV === 'production') {
	connectionURL = process.env.MONGODB_URI;
	sessionSecret = process.env.SESSION_SECRET;
} else {
	connectionURL = 'localhost:27017/NAICA_DB';
	sessionSecret = 'naicaforlife';
}

module.exports = {
	'url':           connectionURL,
	'sessionSecret': sessionSecret
};
