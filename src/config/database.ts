const Sequelize = require('sequelize');
let database={}
//database wide options
let opts = {
    dialect: 'mysql',
    host:  process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    define: {
        freezeTableName: true,
    }
}

database = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, opts);

module.exports = database;