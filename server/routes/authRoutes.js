const passport = require('passport');
var proxy = require('http-proxy-middleware');

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

	app.get(
		'/auth/google/callback',
		passport.authenticate('google'),
		// request, response
		(req, res) => {
			// redirect after authentication
			res.redirect('/surveys');
		}
	);

	//facebook oauth
	app.get('/auth/facebook', passport.authenticate('facebook'));

	app.get(
		'/auth/facebook/callback',
		passport.authenticate('facebook', { failureRedirect: '/login' }),
		(req, res) => {
			res.redirect('/surveys');
		}
	);
	app.get('/api/logout', (req, res) => {
		// logout is a function attached by passport to req (short for request)
		req.logout();
		res.redirect('/');
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
