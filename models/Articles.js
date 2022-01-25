// importing the connection in the database and setting it to mongoose
const mongoose = require('../db/connection');

// Schema
const ArticleSchema = new mongoose.Schema({
	title: String,
	author: String,
	time: new Date(),
	photo_url: String,
	content: String,
});

// instantiate the model
const Articles = mongoose.model('Articles', ArticleSchema);

// Exported the Model
module.exports = Articles;
