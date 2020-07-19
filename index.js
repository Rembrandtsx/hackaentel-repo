// =============================================================
// Server
// =============================================================

// IMPORTS ===============================================
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const fs = require('fs');

const express = require('express');
const app = express();

// CONSTANTS - GLOBAL VARS
const PORT = process.env.PORT || 8080;
const API = 'https://zur1he9mqc.execute-api.us-east-1.amazonaws.com/v7';

// CONFIG ===============================================
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROOT POINTS ===============================================
app.get('/', (req, res, next) => {
    res.status(200).send('GO MAVERICK!');
});
// Target
app.get('/api/audience', sendAudience);
// Clients
app.get('/api/clients', sendClients);
// sms
app.get('/api/sendSMS', sendSMS);
// link
app.get('/api/link', sendLink);
// getJson
app.get('/api/json', sendJSON);

// LISTEN SERVER ===============================================
app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
});


// =============================================================
// Functions
// =============================================================

async function sendAudience(req, res, next) {
    let { threshold, localization } = req.query;

    try {
        if(threshold && localization) {
            let search = fs.readFileSync('result.json');
            search = JSON.parse(search);

            if(threshold.startsWith("top") && threshold.length > 3 && /^\d+$/.test(threshold.slice(3))) {
                let specific = search[localization];
                if(specific) {
                    specific.sort((a, b) => b.value - a.value);
                    res.status(200).send(specific.slice(0, threshold.slice(3)));
                }
                else
                    error(res, 400, "Incorrect query param 'localization'");
            }
            else if (threshold.startsWith("ultimos") && threshold.length > 7 && /^\d+$/.test(threshold.slice(7))) {
                let specific = search[localization];
                if(specific) {
                    specific.sort((a, b) => a.value - b.value);
                    res.status(200).send(specific.slice(0, threshold.slice(7)));
                }
                else
                    error(res, 400, "Incorrect query param 'localization'");
            }
            else {
                error(res, 400, "Incorrect query param 'threshold'");
            }
        }   
        else {
            error(res, 400, "Missing mandatory query params 'threshold' or 'localization'");
        }

    } catch (err) {
        error(res, 500, err);
        console.error(err);
    }
}

async function sendClients(req, res, next) {
    let { localization, value, search } = req.query;
    
    try {
        if (localization && value && search) {
            
        }
        else {
            error(res, 400, "Missing mandatory query params 'value', 'localization' or 'search'");
        }

    } catch (err) {
        error(res, 500, err);
        console.error(err);
    }
}

async function sendSMS(req, res, next) {

}

async function sendLink(req, res, next) {

}

async function sendJSON(req, res, next) {
    try {
        let search = fs.readFileSync('result.json');
        search = JSON.parse(search);
        res.status(200).send(search);
    } catch (err) {
        error(res, 500, err);
        console.error(err);
    }
}

function error(res, code, error) {
    res.status(code).send({ 
        code: code,
        error: error
    });
}