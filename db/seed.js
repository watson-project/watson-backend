// Requires Models
const Article = require('../models/Articles');

// Requires Article Seed
const articleSeed = require ('./seed.json');

// Logic to empty database 
Article.deleteMany({})
    .then(() => {
        console.log('Deleted all the articles!')
    })
    .then(() => {
        return articleSeed.map((articles) => {
            return { ...articles };
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