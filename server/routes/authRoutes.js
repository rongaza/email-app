const passport = require('passport');

// export routes to index.js file
module.exports = app => {
	// when a user comes to this route send them to the oauth flow
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			// specifies to google what access we want to have of users profile
			scope: ['profile', 'email'],
		})
	);

	app.get('/auth/google/callback', passport.authenticate('google'));

	app.get('/api/logout', (req, res) => {
		// logout is a function attached by passport to req (short for request)
		req.logout();
		res.send(req.user);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
