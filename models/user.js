// file that creates a 'user' model for the 'mongoose' plugin

var mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			unique: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
	},
);

const User = mongoose.model('User', userSchema);

// export default User;
module.exports.User = User;
