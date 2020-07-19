// IMPORTS ===============================================
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const express = require('express');
const app = express.app();

// CONSTANTS - GLOBAL VARS
const port = process.env.PORT || 8080;

// CONFIG ===============================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOT POINTS ===============================================
app.get('/', (req, res, next) => {
    res.status(200).send('GO MAVERICK!');
});
// Target
app.get('/api/audience', sendAudience);
// sms
app.get('/api/sendSMS', sendSMS);
// link
app.get('/api/link', sendLink);

// LISTEN SERVER ===============================================
app.listen(port, () => {
    console.log('App listening on port ' + port);
});


// =============================================================
// =============================================================
// Funciones

async function sendAudience(req, res, next) {
    
}

async function sendSMS(req, res, next) {

}

async function sendLink(req, res, next) {
    
}