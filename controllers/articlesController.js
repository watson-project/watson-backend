const express = require('express');
const router = express.Router();

const Articles = require('../models/Articles');

// Index: Get all articles
router.get('/', async (req, res, next) => {
	try {
		const articles = await Articles.find({});
		res.json(articles);
	} catch (error) {
		next(error);
	}
});

// Show: Get one article by id
router.get('/:id', async (req, res, next) => {
	try {
		const article = await Articles.findById(req.params.id);
		if (article) {
			res.json(article);
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
		res.status(201).json(newArticle);l
	} catch (error) {
		next(error)
	}
});

// Update: Edit an article by id
router.put('/:id', async (req, res, next) => {
	try {
		const articleToUpdate = await Articles.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true, overwrite: true }
		);
		res.json(articleToUpdate);
	} catch (error) {
		next(error);
	}
});

// Delete: Remove an article by id
router.delete('/:id', async (req, res, next) => {
	try {
		const deleteArticle = await Articles.findOneAndDelete({
			_id: req.params.id,
		});
		if (deleteArticle) {
			res.json(deleteArticle);
		} else {
			res.sendStatus(404);
		}
	} catch (error) {
		next(error);
	}
});

module.exports = router;
