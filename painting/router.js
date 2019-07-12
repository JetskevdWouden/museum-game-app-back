const {Router} = require('express');
const Painting = require('./model');
const Sequelize = require('sequelize');
//const auth = require('../auth/middleware)

const router = new Router();

//get all paintings
router.get('/paintings', (req, res, next) => {
    Painting
        .findAll()
        .then(paintings => {
            if(paintings.length === 0) {
                res
                    .status(200)
                    .send({
                        message: "CURRENTLY THERE ARE NO PAINTINGS"
                    })
            } else {
                res
                    .status(200)
                    .send({
                        message: "ALL CURRENT PAINTINGS",
                        paintings: paintings
                    })
            }
        })
        .catch(error => next(error))
})

//get 5 random paintings for a game
router.get('/game-paintings', (req, res, next) => {
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