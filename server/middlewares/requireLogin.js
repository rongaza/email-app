module.exports = (request, response, next) => {
	if (!request.user) {
		return response.status(400).send({ error: 'You must login' });
	}
	// proceed on
	next();
};
