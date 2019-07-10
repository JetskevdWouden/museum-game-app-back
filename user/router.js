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
    const user_id = req.user.id
    const user_name= req.user.username
    const game_id = req.body.gameId         //send in body what gameId user wants to join
    
    User
        .update(
            {gameId: game_id},
            {where: {
                userId: user_id
            }}
        )
        .then(user => {
            res
                .status(200)        //correct status code for update
                .send({
                    message: `THIS USER WITH USERNAME ${user_name} HAS BEEN ADDED TO GAME WITH ID ${game_id}`,
                    "username": user.username,
                    "game_id": user.gameId
                })
        })
        .catch(error => next(error))
})

module.exports = router;