const { Router } = require('express');
const Sse = require('json-sse');
const Score = require('./model');
//const User = require('../user/model');
//const Game = require('../game/model');

const router = new Router();

//Logged in --> user = req.user.id
//Game being played by user --> req.user.gameid

router.get('/gamefield', (req, res, next) => {
    const user_id = req.user.user
    //const user_name = req.user.username
    const game_id = req.user.gameId
    //get the "new" game with players
    Score
        .findAll({
            where: {
                userId: user_id,
                gameId: game_id
            }
        })
        .then(entities => {
            console.loge('entities, an array of objects?', entities)
            const json = JSON.stringify(entities)
            const stream = new Sse(json)

            router.get('/stream', (req, res) => {
                stream.init(req, res)
            })

            router.put('/score', (req, res, next) => {
                const newScore = req.body.score     //send score in body from store?

                Score
                    .update(
                        {score: newScore},
                        {where: {
                            userId: user_id,
                            gameId: game_id
                        }}
                    )
                    .then(newScore => {
                        Score
                            .findAll({
                                where: {
                                    userId: user_id,
                                    gameId: game_id
                                }
                            })
                            .then(scores => {
                                const json = JSON.stringify(scores)
                                stream.updateInit(json)
                                stream.send({
                                    message: "SCORE HAS BEEN UPDATED",
                                    "new_score": newScore
                                })
                            })
                            .catch(error => next(error))
                    })
                    .catch(error => next(error))
            })
        })
        .catch(error => next(error))
})

module.exports = router;

