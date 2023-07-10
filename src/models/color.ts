import Sequelize from 'sequelize'
const database = require('../config/database');
export const Color = database.define('cor', {
    descricao: { type: Sequelize.STRING, default: null },
})
