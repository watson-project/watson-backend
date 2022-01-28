const mongoose = require('mongoose');

// Create some custom error types by extending the Javascript
// `Error.prototype` using the ES6 class syntax.  This  allows
// us to add arbitrary data for our status code to the error
// and dictate the name and message.

class OwnershipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message =
			'The provided token does not match the owner of this document';
	}
}

class DocumentNotFoundError extends Error {
	constructor() {
		super();
		this.name = 'DocumentNotFoundError';
		this.statusCode = 404;
		this.message = "The provided ID doesn't match any documents";
	}
}

class BadParamsError extends Error {
	constructor() {
		super();
		this.name = 'BadParamsError';
		this.statusCode = 422;
		this.message = 'A required parameter was omitted or invalid';
	}
}

class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'The provided username or password is incorrect';
	}
}

class InvalidIdError extends Error {
	constructor() {
		super();
		this.name = 'InvalidIdError';
		this.statusCode = 422;
		this.message = 'Invalid id';
	}
}

const handleValidateOwnership = (req, document) => {
	const ownerId = document.owner._id || document.owner;
	// Check if the current user is also the owner of the document
	if (!req.user._id.equals(ownerId)) {
		throw new OwnershipError();
	} else {
		return document;
	}
};

const handleRecordExists = (record) => {
	if (!record) {
		throw new DocumentNotFoundError();
	} else {
		return record;
	}
};

const handleValidateId = (req, res, next) => {
	const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValidId) {
		throw new InvalidIdError();
	} else {
		next();
	}
};

const handleValidationErrors = (err, req, res, next) => {
	if (err.name.match(/Valid/) || err.name === 'MongoError') {
		throw new BadParamsError();
	} else {
		// This the error-handling middleware will be called after
		// all controllers run, so we need to make sure that we pass
		// all of the errors up to this point on to the next
		// error handler in the chain!
		next(err);
	}
};

// This is our generic handler that will be the last in our middleware chain:
const handleErrors = (err, req, res, next) => {
	// If the error contains a statusCode, set the variable to
	// that code and if not, set it to a default 500 code
	const statusCode = err.statusCode || 500;
	// If the error contains a message, set the variable to that
	// message and if not, set it to a generic 'Internal Server Error'
	const message = err.message || 'Internal Server Error';
	// Set the status and send the message as a response to the client
	res.status(statusCode).send(message);
};

module.exports = {
	handleValidateOwnership,
	handleRecordExists,
	handleValidateId,
	handleValidationErrors,
	handleErrors,
};
