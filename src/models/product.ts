import Sequelize from 'sequelize'
const database = require('../config/database');
export const Product = database.define('product', {
    name: { type: Sequelize.STRING, default: null },
    description: { type: Sequelize.STRING, unique: true },
    desativado: { type: Sequelize.BOOLEAN },
    date_deactivated: { type: Sequelize.DATE, default: null },
})


