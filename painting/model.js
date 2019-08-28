const Sequelize = require('sequelize');
const db = require('../db');

const Painting = db.define(
    'painting',
    {
        title: {
            type: Sequelize.STRING,
            field: "title"
        },
        artist: {
            type: Sequelize.STRING,
            field: "artist"
        },
        image: {
            type: Sequelize.STRING,
            field: "image_URL"
        }
    }, {
        timestamps: false,
        tableName: 'paintings'
    }
)

module.exports = Painting;