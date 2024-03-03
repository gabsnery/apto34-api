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

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'root',process.env.DATABASE_PASSWORD, opts);

module.exports = sequelize;