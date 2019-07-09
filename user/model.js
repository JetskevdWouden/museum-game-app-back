const Sequelize = require('sequelize');
const Game = require('../game/model');
const db = require('../db');

const User = db.define(
    'user',
    {
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'users'
    }
)

User.belongsTo(Game);
Game.hasMany(User);

module.exports = User;