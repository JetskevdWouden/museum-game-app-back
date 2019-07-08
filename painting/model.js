const Sequelize = require('sequelize');
const db = require('../db');
//const Game?
const Artist = require('../artist/model');

const Painting = db.define(
    'painting',
    {
        title: {
            type: Sequelize.STRING,
            field: "title"
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

Painting.belongsTo(Artist);

module.exports = Painting;