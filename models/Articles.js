// importing the connection in the database and setting it to mongoose
const mongoose = require('../db/connection');

// Schema
const ArticleSchema = new mongoose.Schema(
<<<<<<< HEAD
  {
    title: String,
    author: String,
    photo_url: String,
    content: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      // required: true,
    },
  },
  // Time Stamps
  // https://masteringjs.io/tutorials/mongoose/timestamps
  { timestamps: true }
=======
	{
		title: String,
		author: String,
		photo_url: String,
		content: String,
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	// Time Stamps
	// https://masteringjs.io/tutorials/mongoose/timestamps
	{ timestamps: true }
>>>>>>> 239700a (edited users.js)
);

// instantiate the model
const Articles = mongoose.model('Articles', ArticleSchema);

// Exported the Model
module.exports = Articles;
