const {Router} = require('express');
const Painting = require('./model');
const Artist = require('../artist/model');
//const auth = require('../auth/middleware)

const router = new Router();

//get all paintings
//no auth yet
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

module.exports = router;