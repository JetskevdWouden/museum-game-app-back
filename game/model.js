const Sequelize = require('sequelize');
const db = require('../db');

const Game = db.define(
    'game',
    {
        //status: can users join true or false
        open: {
            type: Sequelize.BOOLEAN,
            field: 'game_open'
        },
        //status: is game finished true or false
        active: {           
            type: Sequelize.BOOLEAN,
            field: 'game_active'
        }
    }, {
        timestamps: false,
        tableName: 'games'
    }
)

module.exports = Game;
