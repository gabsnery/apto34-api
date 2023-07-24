import Sequelize from 'sequelize'
const database = require('../config/database');
export const Size = database.define('tamanho', {
    descricao: { type: Sequelize.STRING, default: null },
}, {
    tableName: 'tamanho',
    timestamps: false
  });
