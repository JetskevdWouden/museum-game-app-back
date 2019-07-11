const { Router } = require('express');
const bcrypt = require('bcrypt');
const User = require('../user/model');
//const auth = require('../auth/middleware)


const router = new Router();

//NEW USER --> SIGN UP at "/users" --> can't at "/" because already has a POST route for login
router.post('/sign-up', (req, res, next) => {
    const user = {
        username: req.body.username,
        password: req.body.password,
        password_confirmation: req.body.password_confirmation,
    }
    if (user.username && user.password && user.password_confirmation) {
        user.password = bcrypt.hashSync(req.body.password, 10)
        if (bcrypt.compareSync(user.password_confirmation, user.password)) {
            User
                .create(user)
                .then(user => {
                    res
                        .status(201)
                        .send({
                            message: "A NEW USER WAS CREATED",
                            username: user.username,
                            user_id: user.id
                        })
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

router.put('/join-game', (req, res, next) => {
    //const user_id = req.user.id
    const user_id = req.body.userId
    const game_id = req.body.gameId         //send in body what gameId user wants to join

    User
        .findByPk(user_id)
        .then(user => {
            user
                .update({ gameId: game_id })
            res
                .status(200)        //correct status code for update
                .send({
                    message: `THIS USER WITH USERNAME ${user.username} HAS BEEN ADDED TO GAME WITH ID ${game_id}`,
                    "username": user.username,
                    "game_id": user.gameId
                })
        })
        .catch(error => next(error))
})

//get --> users per game id
router.get('/game/:id/users', (req, res, next) => {
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

module.exports = router;

//NOTES
//to add check if username already exists
//add logic here to check if game is full? in join game?
//add to check if game is open: true && active: true