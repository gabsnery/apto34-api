const Sequelize = require('sequelize');
const database:any={}
require('dotenv').config();

//database wide options
let opts = {
    dialect: 'mysql',
    host:  process.env.DATABASE_HOST,
    port:process.env.DATABASE_PORT,
    define: {
        freezeTableName: true,
    }
}
//const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER,process.env.DATABASE_PASSWORD, opts);

const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    port: process.env.DATABASE_PORT,
    define: {
        freezeTableName: true,
    }
  });

database.sequelize = sequelize;
database.Sequelize = Sequelize;



module.exports = {
    Sequelize,
    sequelize
}