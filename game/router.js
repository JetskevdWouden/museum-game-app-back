const {Router} = require('express');
//const Sse = require('json-sse');
const Game = require('./model');
const User = require('../user/model');
//const Painting = require('../painting/model');
//const Sequelize = require('sequelize');
//const auth = require('../auth/middleware)


const router = new Router();

//user creates new game
router.post('/new-game', (req, res, next) => {
    const game = {
        open: true,
        active: true
    }
    Game
        .create(game)
        .then(game => {
            res
                .status(201)
                .send({
                    message: "A NEW GAME WAS CREATED",
                    gameId: game.id,
                    game: game
                })
        })
        .catch(error => next(error))
})

//get all open games
router.get('/open-games', (req, res, next) => {
    Game
        .findAll({
            where: {
                open: true,
                active: true
            }
        })
        .then(games => {
            res
                .status(200)
                .send({
                    message: "ALL CURRENT OPEN TO JOIN GAMES",
                    games: games
                })
        })
        .catch(error => next(error))
})

//put --> update open game to closed game
router.put('/closed-game', (req, res, next) => {
    const gameId = req.body.gameId      //send game id to close in body
    Game
        .findByPk(gameId)
        .update({
            open: false
        })
        .then(game => {
            res
                .status(200)            //corrent HTTP code?
                .send({
                    message: `GAME WITH ID ${gameId} HAS BEEN CLOSED`,
                    game: game
                })
        })
        .catch(error => next(error))
})

//put --> update active game to finished game
router.put('/finished-game', (req, res, next) => {
    const gameId = req.body.gameId      //send game id to deactivate in body
    Game
        .findByPk(gameId)
        .update({
            active: false
        })
        .then(game => {
            res
                .status(200)            //corrent HTTP code?
                .send({
                    message: `GAME WITH ID ${gameId} HAS BEEN DEACTIVATED`,
                    game: game
                })
        })  
        .catch(error => next(error))
})

module.exports = router;