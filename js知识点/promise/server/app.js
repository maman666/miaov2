const express = require('express');
const app = express();

app.get('/', (req, res) => {

	res.setHeader('Access-Control-Allow-Origin', '*')

	setTimeout(() => {
		res.send('Hello');
	}, 3000);

});

app.listen(7777);