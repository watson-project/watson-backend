// Chai Assertion Functions
const should = require('chai').should();
const expect = require('chai').expect;

// Supertest
const supertest = require('supertest');
const api = supertest(require('../index'));

// Get All Article
describe('GET /articles', () => {
	it('should return a 200 response', (done) => {
		api
			.get('/api/articles')
			.set('Accept', 'application/json')
			.expect(200, done);
	});

	it('should return an array', (done) => {
		api
			.get('/api/articles')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
				done();
			});
	});
});

// Get a specific Article
describe('GET /api/articles/:id', () => {
	let articleID;
	before((done) => {
		api.get('/api/articles').end((err, res) => {
			articleID = res.body[0]._id;
			done();
		});
	});

	it('should return a Article with the right field', (done) => {
		api.get(`/api/articles/${articleID}`).end((err, res) => {
			expect(res.body).to.have.property('title');
			expect(res.body).to.have.property('author');
			expect(res.body).to.have.property('photo_url');
			expect(res.body).to.have.property('content');
			expect(res.body._id).to.equal(articleID);
			done();
		});
	});
});

// POST - Create a new Article
describe('POST /api/articles', () => {
	const newArticles = {
		title: 'The Cat in the Hat',
		author: 'Dr. Seuss',
		photo_url:
			'https://images.pexels.com/photos/4588057/pexels-photo-4588057.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260',
		content: 'Cat was in the Hat',
	};
	let newArticleID;
	before((done) => {
		api
			.post('/api/articles')
			.set('Accept', 'application/json')
			.send(newArticles)
			.end((err, res) => {
				newArticleID = res.body._id;
				done();
			});
	});

	it('should add the new article to the collection and return it', (done) => {
		api
			.get('/api/articles')
			.set('Accept', 'application/json')
			.end((err, res) => {
				const newArticle = res.body.find(
					(article) => article._id === newArticleID
				);
				expect(newArticle).to.be.an('object');
				done();
			});
	});
});

// PUT - Updating an Article
describe('PUT /api/articles', () => {
	const newArty = {
		title: "George Bush doesn't eat cats!",
		author: 'Barack Obama',
		photo_url:
			'https://i.kym-cdn.com/photos/images/facebook/000/516/911/cba.jpg',
		content: "Barack Obama holds a ted talk that George Bush doesn't eat cats.",
	};
	let newArtyID;
	before((done) => {
		api
			.post('/api/articles')
			.send(newArty)
			.end((err, res) => {
				newArtyID = res.body._id;
				done();
			});
	});
	const newTitle = 'George Bush does eat Cats!';
	it('should correctly update the article with the new data', (done) => {
		api
			.put(`/api/articles/${newArtyID}`)
			.send({ ...newArty, title: newTitle })
			.end((err, res) => {
				expect(res.body.title).to.equal(newTitle);
				done();
			});
	});
});

// DELETE - Delete an Article
describe('DELETE /api/articles/:id', () => {
	let artID;
	before((done) => {
		api.get('/api/articles').end((err, res) => {
			artID = res.body[0]._id;
			done();
		});
	});
	it('should retrieve the correct response status 200', (done) => {
		api.delete(`/api/articles/${artID}`).end((err, res) => {
			expect(res.status).to.equal(200);
			expect(res.body._id).to.equal(artID);
			done();
		});
	});
	it('should delete an article from the article array', (done) => {
		api.get(`/api/articles/${artID}`).end((err, res) => {
			const deletedArticle = res.body;
			expect(deletedArticle).to.deep.equal({});
			expect(res.status).to.equal(404);
			done();
		});
	});
});

// describe('GET /api/articles/search/:title', () => {

// })