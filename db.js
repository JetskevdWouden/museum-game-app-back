const Sequelize = require('sequelize');
const databaseURL = process.env.DATABASE_URL || 'postgres://postgres:secretart@localhost:5432/postgres'

const sequelize = new Sequelize(databaseURL);

sequelize
    .sync({force:true})
    .then(() => console.log('Database schema updated'))
    .catch(console.error)

module.exports = sequelize;