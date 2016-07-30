mongoose = require('mongoose')
Schema   = mongoose.Schema
crypto   = require('crypto')

userSchema = new Schema(
	email: 
		type: String
		unique: true
		required: true
	name: 
		type: String
		required: true
	hash: String
	salt: String
)

# set a new password
userSchema.methods.setPassword = (password) ->
	@salt = crypto.randomBytes(16).toString('hex')
	@hash = crypto.pbkdf2Sync(password, @salt, 1000, 64).toString('hex')

# check if inputted password is valid
userSchema.methods.validPassword = (password) -> 
	hash = crypto.pbkdf2Sync(password, @salt, 1000, 64).toString(64)
	@hash == hash

User = mongoose.model('User', userSchema)
module.exports = User