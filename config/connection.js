require('babel-register');
let connectionURL 	= '',
		sessionSecret   = '',
		mailchimpApiKey = '',
		mailchimpListID = '',
		postmarkKey     = '';

if (process.env.NODE_ENV === 'production') {
	connectionURL   = process.env.MONGODB_URI;
	sessionSecret   = process.env.SESSION_SECRET;
	mailchimpApiKey = process.env.MAILCHIMP_KEY;
	mailchimpListID = process.env.MAILCHIMP_LIST_ID;
	postmarkKey     = process.env.POSTMARK_KEY;
} else { //development
	const keys      = require('./keys.json');
	connectionURL   = 'localhost:27017/NAICA_DB';
	sessionSecret   = keys.session_secret;
	mailchimpApiKey = keys.mailchimp;
	mailchimpListID = keys.list_id;
	postmarkKey     = keys.postmark_key;
}

module.exports = {
	'url'            : connectionURL,
	'sessionSecret'  : sessionSecret,
	'mailchimp'      : mailchimpApiKey,
	'mailchimpListID': mailchimpListID,
	'postmarkKey'   : postmarkKey
};
