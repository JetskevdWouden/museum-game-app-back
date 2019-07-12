const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../user/model');
const auth = require('../auth/middleware');
const Game = require('../game/model');


const router = new Router();

//NEW USER --> SIGN UP at "/users" --> can't at "/" because already has a POST route for login
router.post('/sign-up', (req, res, next) => {
    const newUser = {
        username: req.body.username,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
    }
    if (newUser.username && newUser.password && newUser.password_confirmation) {
        newUser.password = bcrypt.hashSync(req.body.password, 10)
        if (bcrypt.compareSync(newUser.password_confirmation, newUser.password)) {
            User
                .findOne({
                    where: {
                        username: newUser.username
                    }
                })
                .then(user => {
                    if (!user) {
                        User
                            .create(newUser)
                            .then(user => {
                                res
                                    .status(201)
                                    .send({
                                        message: "A NEW USER WAS CREATED",
                                        username: user.username,
                                        user_id: user.id
                                    })
                            })
                    } else if (user.username === newUser.username) {
                        res
                            .status(409) //conflict?
                            .send({
                                message: `USERNAME ${newUser.username} ALREADY EXISTS`
                            })
                    }
                })
                .catch(error => next(error))
        } else {
            res
                .status(422)
                .send({
                    message: "PLEASE MAKE SURE YOUR PASSWORDS MATCH"
                })
        }
    } else {
        res
            .status(400)
            .send({
                message: "PLEASE FILL IN ALL REQUIRED FIELDS"
            })
    }
})

//user joins an open game
//user's gameId is updated
router.put('/join-game', auth, (req, res, next) => {
    const user_id = req.user.id
    const game_id = req.body.gameId         //send in body what gameId user wants to join

    Game
        .findOne({
            where: {
                id: game_id
            }
        })
        .then(game => {
            if (!game) {
                res
                    .status(404)
                    .send({
                        message: "THIS GAME DOES NOT EXIST"
                    })
            } else if (!game.open || !game.active) {
                res
                    .status(404)
                    .send({
                        message: `GAME WITH ID ${game_id} IS CLOSED OR FINISHED`
                    })
            } else {
                User
                    .findByPk(user_id)
                    .then(user => {
                        user
                            .update({ gameId: game_id })
                        res
                            .status(200)
                            .send({
                                message: `THIS USER WITH USERNAME ${user.username} HAS BEEN ADDED TO GAME WITH ID ${game_id}`,
                                "username": user.username,
                                "game_id": user.gameId
                            })
                    })
                    .catch(error => next(error))
            }
        })
        .catch(error => next(error))
})

//get --> users per game id
router.get('/game/:id/users', auth, (req, res, next) => {
    const gameId = req.params.id
    User
        .findAll({
            where: {
                gameId: gameId
            }
        })
        .then(users => {
            const players = users.map(player => {
                const playerId = player.id
                const playerUsername = player.username
                return {
                    userId: playerId,
                    username: playerUsername
                }
            })
            res
                .status(200)
                .send({
                    message: `USERS IN GAME WITH ID ${gameId}`,
                    players: players
                })
        })
        .catch(error => next(error))
})

//get --> user by id
router.get('/users/:id', auth, (req, res, next) => {
    //const userId = req.body.userId
    const userId = req.params.id

    User
        .findByPk(userId)
        .then(user => {
            if (!user) {
                res
                    .status(404)
                    .send({
                        message: `USER WITH ID ${userId} DOES NOT EXIST`
                    })
            } else {
                res
                    .status(200)
                    .send({
                        message: `USER WITH ID ${user.id}`,
                        userId: user.id,
                        username: user.username
                    })
            }
        })
        .catch(error => next(error))
})

module.exports = router;

//NOTES
//to add check if username already exists
//add logic here to check if game is full? in join game?
//add to check if game is open: true && active: true