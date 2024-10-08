const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const DB_URL = "mongodb+srv://gokuljinu:aughTiRO8oz5d4Ja@notes-app-cluster-exec0.trgzd.mongodb.net/gbc-fall2020?retryWrites=true&w=majority";
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true // This can be removed if you want to avoid the warning, but it's generally fine to keep it.
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// Sample data structure (replace this with your MongoDB model)
let notes = []; // This will temporarily hold notes in memory

// Route for GET /notes
app.get('/notes', (req, res) => {
    res.json(notes); // Return the notes array
});

// Route for POST /notes
app.post('/notes', (req, res) => {
    const newNote = req.body;
    notes.push(newNote); // Store the new note (replace with your MongoDB logic)
    res.status(201).json(newNote); // Return the newly created note
});

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 8081");
});