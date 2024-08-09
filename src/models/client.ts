import Sequelize from 'sequelize'
const database = require('../config/database');
export const Client = database.sequelize.define('cliente', {
    nome: { type: Sequelize.STRING, default: null },
    sobrenome: { type: Sequelize.STRING, default: null },
    email: { type: Sequelize.STRING, unique: true },
    senha: { type: Sequelize.STRING },
    cpf: { type: Sequelize.STRING },
    token: { type: Sequelize.STRING },
    admin: { type: Sequelize.BOOLEAN },
})
