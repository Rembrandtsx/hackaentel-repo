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
const LINK = 'http://entelsalud.netlify.app/';

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
app.get('/api/sms', sendSMS);
// link
app.get('/api/link', sendLink);
// getJson
app.get('/api/json', sendJSON);

app.get('/dashboard', sendDashboard);

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
        error(res, 500, err.message);
        console.error(err);
    }
}

async function sendClients(req, res, next) {
    let { localization, value, search } = req.query;
        
    try {
        if (localization && value && search) {
            if(localization === "Departamento" || localization === "Provincia" || localization === "Distrito") {
                let payload = {
                    [localization]: search,
                    Valor: value
                };
    
                let request = await fetch(`${API}/cliente/top`, {
                    method: "post",
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await request.json();
                res.status(200).send(result);
            }
            else
                error(res, 400, "Incorrect query param 'localization'");
        }
        else
            error(res, 400, "Missing mandatory query params 'value', 'localization' or 'search'");

    } catch (err) {
        error(res, 500, err.message);
        console.error(err);
    }
}

async function sendSMS(req, res, next) {
    let { phone, message } = req.query;

    try {
        if (phone && message) {
            if(/^\d+$/.test(phone)) {
                let payload = {
                    Telefono: phone,
                    Mensaje: message
                };
    
                let request = await fetch(`${API}/sms`, {
                    method: "post",
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await request.json();
                res.status(200).send(result);
            }
            else
                error(res, 400, "Incorrect query param 'phone'");
        }
        else   
            error(res, 400, "Missing mandatory query params 'phone' or 'message'");
            
    } catch (err) {
        error(res, 500, err.message);
        console.error(err);
    }
}

async function sendLink(req, res, next) {
    let { id, type } = req.query;
    
    try {
        if(id && type) {
            if((type === "RUC" || type === "DNI") && /^\d+$/.test(id)) {
                let payload = {
                    TipoDocumento: type,
                    NumeroDocumento: id
                };
    
                let request = await fetch(`${API}/cliente`, {
                    method: "post",
                    body: JSON.stringify(payload),
                    headers: { 'Content-Type': 'application/json' }
                });
                let result = await request.json();
                let cliente = result.Cliente;
                if(cliente) {
                    let ref = '';
                    switch (cliente.Segmentacion) {
                        case "TOP":
                            ref = 'empresas';
                            break;
                        case "GRANDE":
                            ref = 'pymes';
                            break;
                        case "MEDIO":
                            ref = 'micro';
                            break;
                        case "BAJO":
                            ref = 'personas';
                            break;
                    }
                    let link = `${LINK}${ref}?amount=${cliente.Suscriptores.length}`;
                    res.status(200).send({ link });
                }
                else {
                    error(res, 404, "No client found for the given query params");
                }
            }
            else
                error(res, 400, "Incorrect query param 'type'");
        }
        else
            error(res, 400, "Missing mandatory query params 'id' or 'type'");
    } catch (err) {
        error(res, 500, err.message);
        console.error(err);
    }
}

async function sendJSON(req, res, next) {
    try {
        let search = fs.readFileSync('result.json');
        search = JSON.parse(search);
        res.status(200).send(search);
    } catch (err) {
        error(res, 500, err.message);
        console.error(err);
    }
}

async function sendDashboard(req, res, next) {
    try {
        let archivo = fs.readFileSync('./public/index.html');
        res.status(200).send(archivo);
    } catch (err) {
        error(res, 500, err.message);
        console.error(err);
    }
}

function error(res, code, error) {
    res.status(code).send({ 
        code: code,
        error: error
    });
}