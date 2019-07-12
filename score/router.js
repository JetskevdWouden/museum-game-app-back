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
    const { score } = req.body                  //send score in body --> from store?
    const { userId } = req.body                 //change -> get userId from header?? user = req.user.id
    const { gameId } = req.params
    Score
        .update(
            { score },
            { where: { userId, gameId } }
        )
        .then(newScore => {
            Score
                .findAll({ where: { gameId } })
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

