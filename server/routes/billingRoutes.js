const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
	app.post('/api/stripe', requireLogin, async (request, response) => {
		const charge = await stripe.charges.create({
			amount: 500,
			currency: 'usd',
			description: '$5 for 5 credits',
			source: request.body.id,
		});

		// add 5 credits to user
		// access current user model through passport by request.user
		request.user.credits += 5;
		// any database change is a async so must use await
		const user = await request.user.save();

		// send user back to browser
		response.send(user);
	});
};
