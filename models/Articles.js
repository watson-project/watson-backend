// importing the connection in the database and setting it to mongoose
const mongoose = require('../db/connection');

// Schema
const ArticleSchema = new mongoose.Schema(
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
);

// instantiate the model
const Articles = mongoose.model('Articles', ArticleSchema);

// Exported the Model
module.exports = Articles;
