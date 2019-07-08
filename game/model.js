const Sequelize = require('sequelize');
//const User = require('../user/model');
const db = require('../db');

const Game = db.define(
    'game',
    {
        //add content here?
        coveredBlocks: {
            type: Sequelize.INTEGER,
            field: 'covered_blocks'
        },
        //status: games active? OR game finished? OR game started?
        status: {           
            type: Sequelize.BOOLEAN,
            field: 'game_active'
        }
    }, {
        timestamps: false,
        tableName: 'games'
    }
)

//Game.hasMany(User);

module.exports = Game;
