//Required Modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db');

//DB - MODELS
// const User = require('./user/model');
// const Painting = require('./painting/model');
// const Game = require('./game/model');
// const Score = require('./score/model');

//DB - ROUTERS
const authRouter = require('./auth/router');
const userRouter = require('./user/router');
const scoreRouter = require('./score/router');
const paintingRouter = require('./painting/router');
const gameRouter = require('./game/router');

//Initialize & Define Port
const app = express();
const port = process.env.PORT || 5000;


//Declare Middleware
const jsonParser = bodyParser.json();

//Register Middleware
app.use(cors());
app.use(jsonParser);
app.use(authRouter);
app.use(userRouter);
app.use(scoreRouter);
app.use(paintingRouter);
app.use(gameRouter);

//Add onListen function that logs the current port
function onListen() {
    console.log(`Listening on port ${port}.`);
}

//Start Listening
app.listen(port, onListen);