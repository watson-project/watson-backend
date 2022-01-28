const express = require('express');
const res = require('express/lib/response');
const app = require('..');
const router = express.Router();
const { requireToken } = require('../middleware/auth');

const Articles = require('../models/Articles');

// Index: Get all articles
router.get('/', async (req, res, next) => {
	try {
		const articles = await Articles.find({});
		if (articles) {
			res.status(200).json(articles);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Show: Get one article by id
router.get('/:id', async (req, res, next) => {
	try {
		const article = await Articles.findById(req.params.id);
		console.log(article);
		if (article) {
			res.status(200).json(article);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Create: Add an article
router.post('/', async (req, res, next) => {
	try {
		const newArticle = await Articles.create(req.body);
		if (newArticle) {
			res.status(201).json(newArticle);
		} else {
			return res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

// Update: Edit an article by id
router.put('/:id', requireToken, async (req, res, next) => {
	try {
		const articleToUpdate = await Articles.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, overwrite: true }
		);
		if (articleToUpdate) {
			res.status(202).json(articleToUpdate);
		} else {
			return res.sendStatus(406);
		}
	} catch (error) {
		next(error);
	}
});

// Delete: Remove an article by id
router.delete('/:id', requireToken, async (req, res, next) => {
	try {
		const deleteArticle = await Articles.findOneAndDelete({
			_id: req.params.id,
		});
		if (deleteArticle) {
			res.status(200).json(deleteArticle);
		} else {
			res.sendStatus(405);
		}
	} catch (error) {
		next(error);
	}
});

router.get('/search/:title', async (req, res, next) => {
	try {
		const regexTitle = new RegExp(req.params.title)
		const searchArticle = await Articles.find({ "title": { "$regex": regexTitle, "$options": "i"}})
		if (searchArticle) {
			res.status(200).json(searchArticle);
		} else {
			res.sendStatus(405);
		}
	} catch (error) {
		next(error);
	}
})

module.exports = router;
