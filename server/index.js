const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

// order matters for these two or you get an error
require('./models/User');
require('./services/passport');

// use mongoose to connect to mongoAtlaskfjkdsjfkdklsfjauekldjfudf

mongoose.connect(keys.mongoURI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => {
		console.log('Connected to MongoDb');
	})
	.catch(err => console.log('Error on start: ', +err.stack));

// create express app
const app = express();

// setting up middleware to modify/preprocess requests

// tell express is needs to make use of cookies
// cookie is limited to about 4kb
app.use(
	cookieSession({
		// make cookie last 30 days before expires
		// time is represented in milliseconds
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);

app.use(passport.initialize());
app.use(passport.session());

// returns a function from file and invokes it with (app)
require('./routes/authRoutes')(app);

// heroku environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Listening on port: ', PORT);

// http://localhost:5000/auth/google
