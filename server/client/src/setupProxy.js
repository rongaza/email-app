const proxy = require('http-proxy-middleware');

module.exports = function(app) {
	// in the body add the following to allow for advance proxying
	app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
	app.use(proxy('/api/*', { target: 'http://localhost:5000' }));
	app.use(proxy('/auth/google', { target: 'http://localhost:5000' }));
};
