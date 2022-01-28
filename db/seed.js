// Requires Models
const Article = require('../models/Articles');
const User = require('../models/Users');
const bcrypt = require('bcrypt');

// Requires Article Seed
const articleSeed = require('./seed.json');
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
    return Promise.all(
      userSeed.map(async (users) => {
        const password = await bcrypt.hash(users.password, 10);
        return { email: users.email, password: password };
      })
    );
  })
  .then((user) => {
    return User.insertMany(user);
  })
  .then((newUser) => {
    console.log('Created a new user!', newUser);
    return articleSeed.map((articles) => {
      const random = Math.floor(Math.random() * userSeed.length);
      return { ...articles, owner: newUser[random]._id };
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
