const { Router } = require('express');
const Game = require('./model');
const User = require('../user/model');
const auth = require('../auth/middleware');
const Score = require('../score/model');

const router = new Router();

//GET - create new game
router.post('/new-game', auth, (req, res, next) => {
    const userId = req.user.id
    const game = {
        open: true,
        active: true
    }

    Game
        .create(game)
        .then(game => {
            const gameId = game.id
            User
                .findOne({
                    where: {
                        id: userId
                    }
                })
                .then(user => {
                    user
                        .update({ gameId })
                    Score
                        .create({
                            userId: userId,
                            gameId: user.gameId
                        })
                        .then(entity => {

                        })
                        .catch(error => next(error))
                })
                .catch(error => next(error))
            res
                .status(201)
                .send({
                    message: `A NEW GAME WAS CREATED & USER WITH ID ${userId} HAD JOINED`,
                    game: game
                })
        })
        .catch(error => next(error))
})

//GET - return all games where open === true
router.get('/open-games', auth, (req, res, next) => {
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

//GET - game by id
router.get('/game/:id', auth, (req, res, next) => {
    const gameId = req.params.id

    Game
        .findByPk(gameId)
        .then(game => {
            if (!game) {
                res
                    .status(404)
                    .send({
                        message: `GAME WITH ID ${gameId} DOES NOT EXIST`
                    })
            } else if (game.active === false) {
                res
                    .status(404)
                    .send({
                        message: `GAME WITH ID ${gameId} IS FINISHED/CLOSED`
                    })
            } else {
                res
                    .status(200)
                    .send({
                        message: `GAME WITH ID ${gameId}`,
                        game: game
                    })
            }
        })
        .catch(error => next(error))
})

//ENDPOINT NOT IN USE
//PUT - update game open => false
router.put('/closed-game', auth, (req, res, next) => {
    const { gameId } = req.body

    Game
        .findByPk(gameId)
        .then(game => {
            game
                .update({
                    open: false
                })
            res
                .status(200)
                .send({
                    message: `GAME WITH ID ${gameId} HAS BEEN CLOSED`,
                    game: game
                })
        })
        .catch(error => next(error))
})

//ENDPOINT NOT IN USE
//PUT - update game active => false
router.put('/finished-game', auth, (req, res, next) => {
    const { gameId } = req.body

    Game
        .findByPk(gameId)
        .then(game => {
            game
                .update({
                    active: false
                })
            res
                .status(200)
                .send({
                    message: `GAME WITH ID ${gameId} HAS BEEN DEACTIVATED`,
                    game: game
                })
        })
        .catch(error => next(error))
})

module.exports = router;