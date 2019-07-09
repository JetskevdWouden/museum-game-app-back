const {Router} = require('express');
//const Sse = require('json-sse');
//const Game = require('./model');
const User = require('../user/model');
const Painting = require('../painting/model');
const Sequelize = require('sequelize');

const router = new Router();

//user joins a game
router.put('/game', (req, res, next) => {
    const user_id = req.user.id
    const user_name= req.user.username
    const game_id = req.body.gameId         //send in body what gameId user wants to join
    
    User
        .update(
            {gameId: game_id},
            {where: {
                userId: user_id
            }}
        )
        .then(user => {
            res
                .status(200)        //correct status code for update
                .send({
                    message: `THIS USER WITH USERNAME ${user_name} HAS BEEN ADDED TO GAME WITH ID ${game_id}`,
                    "username": user.username,
                    "game_id": user.gameId
                })
        })
        .catch(error => next(error))
})

//get 5 random paintings for a game
router.get('/game', (req, res, next) => {
    Painting
        .findAll(
            {order: Sequelize.literal('random()'), limit: 5}
        )
        .then(paintings => {
            console.log("IS THIS AN ARRAY OF PAINTING OBJECTS?", paintings)
            res
                .status(200)
                .send({
                    message: "5 RANDOM PAINTINGS FROM DATABASE",
                    paintings: paintings
                })
        })
        .catch(error => next(error))
})

module.exports = router;