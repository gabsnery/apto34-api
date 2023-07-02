const Sequelize = require('sequelize');

//database wide options
var opts = {
    dialect: 'mysql',
    host: 'localhost',
}

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root',process.env.DATABASE_PASSWORD, opts);

module.exports = sequelize;