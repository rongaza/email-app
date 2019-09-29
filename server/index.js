const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.send({ hi: 'there' });
});

// heroku environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT);

console.log('Listening on port: ', PORT);
