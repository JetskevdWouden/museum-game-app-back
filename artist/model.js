const Sequelize = require('sequelize');
const db = require('../db');

const Artist = db.define(
    'artist',
    {
        firstName: {
            type: Sequelize.STRING,
            field: "first_name"
        },
        lastName: {
            type: Sequelize.STRING,
            field: "last_name"
        }
    }, {
        timestamps: false,
        tableName: 'artists'
    }
)

module.exports = Artist;