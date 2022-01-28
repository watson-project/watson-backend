// Requires Models
const Article = require('../models/Articles');
const User = require('../models/Users');

// Requires Article Seed
const articleSeed = require ('./seed.json');
const userSeed = require('./seedUser.json');

// Logic to empty database 
Article.deleteMany({})
	.then(() => {
		console.log('Deleted all the articles!');
		User.deleteMany({});
	})
	.then(() => {
		console.log('Deleted all the users!');
	})
	.then(() => {
		return userSeed.map((users) => {
            return User.create({ email: users.email, password: users.password })
        });
	})
	.then((user) => {
		return User.insertMany(user);
	})
	.then((newUser) => {
		console.log('Created a new user!', newUser);
		return articleSeed.map((articles) => {
			return Article.create({ ...articles, owner: newUser._id });
		});
	})
	.then((articles) => {
		return Article.insertMany(articles);
	})
	.then((newArticle) => {
		console.log('We just created new articles!', newArticle);
	})
	.catch(console.error)
	.finally(() => {
		process.exit();
	});