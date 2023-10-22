const express = require('express');


// Import our modular router for /notes
const notes = require('../db/db.json');
const app = express();

// set route to return notes json file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '/db/db.json'))
);

module.exports = app;
