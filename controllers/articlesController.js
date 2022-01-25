const express = require('express');
const Articles = require('../db/models/Articles');

const router = express.Router();

// Index: Get all articles
router.get('/', (req, res) => {
	Articles.find({}).then((cone) => {
		res.json(cone);
	});
});

// Show: Get one article by id
router.get('/:id', (req, res) => {
	Articles.findById({ _id: req.params.id }).then((cone) => {
		res.json(cone);
	});
});

// Create: Add an article
router.post('/', (req, res) => {
	Articles.create(req.body).then((cone) => {
		res.status(201).json(cone);
	});
});

// Update: Edit an article by id
router.put('/:id', (req, res) => {
	Articles.findByIdAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((cone) => {
		res.json(cone);
	});
});

// Delete: Remove an article by id
router.delete('/:id', (req, res) => {
	Articles.findByIdAndDelete({ _id: req.params.id }).then((delCone) => {
		res.json(delCone);
	});
});

module.exports = router;
