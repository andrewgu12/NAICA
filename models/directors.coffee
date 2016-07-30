mongoose = require('mongoose')
Schema   = mongoose.Schema

directorSchema = new Schema(
	name		  : { type: String,  default: ''        	 }
	description   : { type: String,  default: ''        	 }
	imgSource     : { type: String,  default: ''             }
	title         : { type: String,  default: ''             }
)

Director = mongoose.model('Director', directorSchema)
module.exports = Director