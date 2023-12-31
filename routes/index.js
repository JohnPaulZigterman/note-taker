const express = require('express');
const path = require('path'); 
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const app = express();

// set route to return notes json file
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, '../db/db.json'))
);

app.post('/notes', (req, res) => {
    console.log(`${req.method} request received to add a note`);
    const { title, text } = req.body;

    if (title && text) {

        const newNote = {
            title,
            text,
            id: uuidv4(),
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        // TODO: Add the newNote to the db.json file
        fs.readFile('./db/db.json', function (err, data) {
            var newData = JSON.parse(data);

            newData.push(newNote);
            var pushData = JSON.stringify(newData);
            fs.writeFileSync('./db/db.json', pushData);
        });

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

app.delete('/notes/:id', function (req, res) {
    const request = req.params;
    const requestID = request.id;


    fs.readFile('./db/db.json', function (err, data) {
        
        var newData = JSON.parse(data);

        var pushData = [];

        var response = {
            status: 'success',
            body: '',
        };

        for (let i = 0; i < newData.length; i++) {

            if (newData[i].id !== requestID) {
                pushData.push(newData[i]);
            } else {
                response.body = 'removed ' + newData[i].title;
            }
        };

        var deletedData = JSON.stringify(pushData);

        fs.writeFileSync('./db/db.json', deletedData);
        
        res.status(201).json(response);
        console.log(err);

        })
    });

module.exports = app;
