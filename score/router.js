const { Router } = require('express');
const Sse = require('json-sse');
const Score = require('./model');

const router = new Router();

Score
    .findAll() //where users (userId in scores table) in the same game(gameId in users table)
    .then(scores => {
        const json = JSON.stringify(scores) //need to stringify INTEGERS?
        const stream = new Sse(json)
        console.log("JSON INTO STREAM", json)

        router.get('/stream', (req, res) => {
            stream.init(req, res)   //sends response back
        })

        router.post('/score', (req, res, next) => {
            console.log("REQ BODY", req.body)
            const score = req.body.score
            //also get userId to which score belongsto

            Score
                .create(score)
                .then(score => {
                    Score
                        .findAll()  //where users (userId in scores table) in the same game(gameId in users table)
                        .then(scores => {
                            const json = JSON.stringify(scores) //need to stringify INTEGERS?
                            stream.updateInit(json)
                            stream.send(json)
                            return (
                                res
                                    .status(201)
                                    .send({
                                        message: "NEW UPDATED SCORES",
                                        "new_score": score 
                                    })
                            )

                        })
                        .catch(error => next(error))
                })
                .catch(error => next(error))
        })
    })
    .catch(console.error)

module.exports = router;

