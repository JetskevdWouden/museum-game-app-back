const { Router } = require('express');
const { toJWT } = require('./jwt');
const bcrypt = require('bcrypt');
const User = require('../user/model');

const router = new Router();

//LOGIN AUTHENTICATION AT "/"

router.post('/login', (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    
    if (username && password) {
        User
            .findOne({
                where: {
                    username: username
                }
            })
            .then(entity => {
                if (!entity) {
                    res
                        .status(400)
                        .send({
                            message: "USERNAME OR PASSWORD IS INCORRECT"
                        })
                } else {
                    if (bcrypt.compareSync(password, entity.password)) {
                        res
                            .status(200)
                            .send({
                                message: "JWT",
                                JWT: toJWT({ userId: entity.id })
                            })
                    } else {
                        res
                            .status(400)
                            .send({
                                message: "PASSWORD IS INCORRECT"
                            })
                    }
                }
            })
            .catch(error => next(error))
    } else {
        res
            .status(400)
            .send({
                message: "PLEASE SUPPLY VALID EMAIL AND PASSWORD"
            })

    }
})

module.exports = router;