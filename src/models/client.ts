import Sequelize from 'sequelize'
const database = require('../config/database');
export const Client = database.define('cliente', {
    nome: { type: Sequelize.STRING, default: null },
    sobrenome: { type: Sequelize.STRING, default: null },
    email: { type: Sequelize.STRING, unique: true },
    senha: { type: Sequelize.STRING },
    token: { type: Sequelize.STRING },
})
