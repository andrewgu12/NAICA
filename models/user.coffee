# User Model - schema + methods for setting and validating password


mongoose = require('mongoose')
Schema   = mongoose.Schema
crypto   = require('crypto')

userSchema = new Schema(
	email: 
		type    : String
		unique  : true
		required: true
	name: String
	hash: String
	salt: String
)

# set a new password
userSchema.methods.setPassword = (password) ->
	@salt = crypto.randomBytes(16).toString('hex')
	@hash = crypto.pbkdf2Sync(password, @salt, 1000, 64).toString('hex')

# check if inputted password is valid
userSchema.methods.validPassword = (password) -> 
	hash = crypto.pbkdf2Sync(password, @salt, 1000, 64).toString('hex')
	@hash == hash

User = mongoose.model('User', userSchema)
module.exports = User