// IMPORTS
const bodyParser = require('body-parser');

const express = require('express');
const app = express.app();

// CONSTANTS - GLOBAL VARS
const port = process.env.PORT || 8080;

// CONFIG
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOT POINTS
app.get('/', (req, res, next) => {
    res.status(200).send('Hello world!');
});

// LISTEN SERVER
app.listen(port, () => {
    console.log('App listening on port ' + port);
});