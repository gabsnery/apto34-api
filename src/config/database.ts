const Sequelize = require('sequelize');

//database wide options
var opts = {
    dialect: 'mysql',
    host:  process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    define: {
        freezeTableName: true,
    }
}

const database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, opts);

module.exports = database;