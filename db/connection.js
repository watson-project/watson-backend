// db/connection.js
require('dotenv').config();
const mongoose = require('mongoose');

// Mongo URL and Connection
const mongoURI = process.env.DATABASE_URL;
const db = mongoose.connection;

// Connect to Mongo
mongoose.connect(mongoURI);

// Connection Error/Success - optional but can be helpful
db.on('error', (error) => console.log(error.message + ' is MongoDB not running?'));
db.on('Connected', () => console.log('MongoDB connected at: ', mongoURI));
db.on('Disconnected', () => console.log('MongoDB has disconnected'));

// Open the Connection
db.on('open', () => {
	console.log('Mongo connection has been made!');
});

module.exports = mongoose;
