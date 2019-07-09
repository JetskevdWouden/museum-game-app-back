const Sequelize = require('sequelize');
const db = require('../db');
const User = require('../user/model');
const Game = require('../game/model');

const Score = db.define(
    'score',
    {
        score: {
            type: Sequelize.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'scores'
    }
)

//has a userId
//has a gameId

Score.belongsTo(User);
Score.belongsTo(Game);

module.exports = Score;