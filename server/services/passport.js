const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// load in the user model class
// anytime access mongoDB it is an async action
// have to assume it returns a promise
const User = mongoose.model('users');

// user is a user model instance of mongo
// will get called after it finds existing user
passport.serializeUser((user, done) => {
	// done is a callback from GoogleStrategy
	// first arg is err object
	// user.id is the id assigned by mongoDB
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	User.findById(id).then(user => {
		done(null, user);
	});
});

// passport be aware new strategy is available
passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			// route url user will be sent to after granting authorization
			callbackURL: '/auth/google/callback',
			proxy: true,
		},
		// callback function for
		// app.get('/auth/google/callback', passport.authenticate('google'));
		async (accessToken, refreshToken, profile, done) => {
			// check if user exists
			// query returns a promise
			const existingUser = await User.findOne({ googleId: profile.id });
			if (existingUser) {
				// call done function
				// first argument is err,
				// when done is called it will invoke serializeUser()
				return done(null, existingUser);
			}
			// if there is no user with that ID
			const user = await new User({ googleId: profile.id }).save();
			done(null, user);
		}
	)
);

passport.use(
	new FacebookStrategy(
		{
			clientID: keys.facebookClientID,
			clientSecret: keys.facebookClientSecret,
			callbackURL: '/auth/facebook/callback',
			proxy: true,
		},
		async (accessToken, refreshToken, profile, done) => {
			// console.log(profile);
			const existingUser = await User.findOne({ facebookId: profile.id });

			if (existingUser) {
				// call done function
				// first argument is err,
				// when done is called it will invoke serializeUser()
				return done(null, existingUser);
			}
			new User({ facebookId: profile.id }).save().then(user => done(null, user));
		}
	)
);
