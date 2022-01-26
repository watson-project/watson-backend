// Basic Config
const express = require('express');
// instantiate cors 
const cors = require('cors');
// instantiate app 
const app = express();
app.set('port', process.env.PORT || 3000);

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes

// Redirect
app.get('/', (req, res) => {
    res.redirect('/api/articles');
})
// Start Controllers // 
const articlesController = require('./controllers/articlesController.js');
// direct all requests to '/api/articles' 
app.use('/api/articles', articlesController);

// End Controllers 
app.use((err, req, res, next) => {
    const statusCode = res.StatusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).send(message);
});

// Start Server
app.listen(app.get('port'), () => {
    console.log(`🍀 Port: ${app.get('port')} 🌞`);
});

module.exports = app;