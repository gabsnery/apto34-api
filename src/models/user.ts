import Sequelize from 'sequelize'
const database = require('../config/database');
export const User = database.define('client', {
    first_name: { type: Sequelize.STRING, default: null },
    last_name: { type: Sequelize.STRING, default: null },
    email: { type: Sequelize.STRING, unique: true },
    password: { type: Sequelize.STRING },
    token: { type: Sequelize.STRING },
})
