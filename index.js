// Import the pets array from data.js
const pets = require('./data');

// Init express app
const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'));

// GET - / - returns homepage
app.get('/', (req, res) => {
    // Serve up the public folder as static index.html file
    res.sendFile(__dirname + '/public/index.html');
});

// Hello world route
app.get('/api', (req, res) => {
    res.send('Hello World!');
});

// GET - Get all pets from the database
app.get('/api/v1/pets', (req, res) => {
    // Send the pets array as a response
    res.json(pets);
});

// GET - Get pet by owner with query string
app.get('/api/v1/pets/owner', (req, res) => {
    // Get the owner from the request
    const owner = req.query.owner;
    // Find the pets in the pets array
    const petsByOwner = pets.filter(pet => pet.owner === owner);
    // Send the pets or a not found message as a response
    if (petsByOwner.length) {
        res.json(petsByOwner);
    } else {
        res.status(404).send('No pets found for this owner');
    }
});

// GET - Get pet by name
app.get('/api/v1/pets/:name', (req, res) => {
    // Get the name from the request
    const { name } = req.params;
    // Find the pet in the pets array
    const pet = pets.find(pet => pet.name === name);
    // Send the pet or a not found message as a response
    if (pet) {
        res.json(pet);
    } else {
        res.status(404).send('Pet not found');
    }
});

app.listen(PORT, () => {
    console.log('Server is listening on port ' + PORT);
});

module.exports = app;
