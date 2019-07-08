//import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

//DB - MODELS
const User = require('./user/model');
const Painting = require('./painting/model');
const Game = require('./game/model');
const Artist = require('./artist/model');

//DB - ROUTERS
const authRouter = require('./auth/router');
const userRouter = require('./user/router');

//initialize & define port
const app = express();
const port = process.env.PORT || 5000;


//declare middleware
const jsonParser = bodyParser.json();

//register middleware
app.use(cors());
app.use(jsonParser);
app.use(authRouter);
app.use(userRouter);




//add onListen function that logs the current port
function onListen() {
    console.log(`Listening on port ${port}.`);
}

//Start listening
app.listen(port, onListen);