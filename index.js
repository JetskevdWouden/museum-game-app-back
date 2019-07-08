//import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

//DB - MODELS


//DB - ROUTERS


//initialize & define port
const app = express();
const port = process.env.PORT || 5000;

//register middleware
const jsonParser = bodyParser.json();
app.use(cors());


//add onListen function that logs the current port
function onListen() {
    console.log(`Listening on port ${port}.`);
}

//Start listening
app.listen(port, onListen);