// Basic Config
const express = require('express');
// instantiate cors
const cors = require('cors');
// instantiate app
const app = express();
// Requesting logger
const request_logger = require('./middleware/request_logger');
// The catch all for handling errors
const { handleErrors } = require('./middleware/custom_errors');

app.set('port', process.env.PORT || 4000);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(request_logger);

// Routes

// Redirect
app.get('/', (req, res) => {
	res.redirect('/api/articles');
});

// Start Controllers //
const articlesController = require('./controllers/articlesController.js');
// Require the user resource routes and controllers
const usersController = require('./controllers/usersController.js');
// direct all requests to '/api/articles'
app.use('/api/articles', articlesController);
// User controller 
app.use('/api', usersController);

// End Controllers
app.use((err, req, res, next) => {
	const statusCode = res.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
});
// Handling the errors
app.use(handleErrors);

// Start Server
app.listen(app.get('port'), () => {
	console.log(`🍀 Port: ${app.get('port')} 🌞`);
});

module.exports = app;
