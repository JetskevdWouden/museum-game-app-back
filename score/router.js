const { Router } = require('express');
const Sse = require('json-sse');
const Score = require('./model');

const router = new Router();

//SSE Json - Server Sent Events
const stream = new Sse()

//GET - initiate stream per game id
router.get('/stream/:gameId', (req, res) => {
    Score
        .findAll({
            where: {
                gameId: req.params.gameId
            }
        })
        .then(entities => {
            const json = JSON.stringify(entities)
            stream.updateInit(json)
            return stream.init(req, res)
        })
})

//PUT - update score per game id // response all new scores via stream
router.put('/score/:gameId', (req, res, next) => {
    const { score, userId } = req.body
    const { gameId } = req.params

    Score
        .update(
            { score },
            {
                where: {
                    userId,
                    gameId
                }
            }
        )
        .then(newScore => {
            Score
                .findAll(
                    {
                        where: { gameId }
                    }
                )
                .then(entities => {
                    const json = JSON.stringify(entities)
                    stream.updateInit(json)
                    stream.send(json)

                    return res.send(entities)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

module.exports = router;

