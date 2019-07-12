const { Router } = require('express');
const Sse = require('json-sse');
const Score = require('./model');


//!! NECESSARY TO ADD AUTH TO STREAM?

const router = new Router();

const stream = new Sse()

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
            stream.init(req, res)

            return res.send(entities)
        })
})

router.put('/score/:gameId', (req, res, next) => {
    const { score, userId } = req.body
    const { gameId } = req.params
    Score
        .update(
            { score },
            { where: { userId, gameId } }
        )
        .then(newScore => {
            console.log("newScore test:", newScore.dataValues)
            Score
                .findAll({ where: { gameId } })
                .then(entities => {
                    const json = JSON.stringify(entities)
                    console.log("json test:", json)
                    stream.updateInit(json)
                    stream.send(json)

                    return res.send(entities)
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

module.exports = router;

