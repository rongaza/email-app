const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
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

// anytime a post or put request or request body comes into application
// this middleware will parse the body and pass it to the req.body
app.use(bodyParser.json());
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

// import routes
// returns a function from the file and invokes it with (app)
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

// only run if in production
if (process.env.NODE_ENV === 'production') {
	// Express will serve up production assetts
	// like our main.js file or main.css file
	// if any get request for route not recongized by express
	// then look into client/build directory that matches request
	app.use(express.static('client/build'));

	// Express will server up index.html file if it
	// doesn't recognize the route
	const path = require('path');
	app.get('*', (request, response) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

// heroku environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Listening on port: ', PORT);

// http://localhost:5000/auth/google
