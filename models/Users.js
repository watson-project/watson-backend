const mongoose = require('../db/connection');

const userSchema = new mongoose.Schema(
	{
		email: {
			type: String,
			// required: 'Please enter a valid email!',
			unique: true,
		},
		password: {
			type: String,
			// required: 'Please enter a valid password',
		},
		// resetPasswordToken: String,
		// resetPasswordExpires: Date,
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			// ret is the returned Mongoose document
			transform: (_doc, ret) => {
				delete ret.password;
				return ret;
			},
		},
	}
);

module.exports = mongoose.model('Users', userSchema);
