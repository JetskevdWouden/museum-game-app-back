const Sequelize = require('sequelize');
const db = require('../db');
const Painting = require('../painting/model');

//where to define painting that is being played?

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

Game.hasOne(Painting)

module.exports = Game;
