import Sequelize from 'sequelize';
const database = require('../config/database');

// Definindo o modelo para a tabela "estado"
export const State = database.define('estado', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  estado: { type: Sequelize.STRING(40), allowNull: false },
  uf: { type: Sequelize.STRING(2), allowNull: false },
}, {
  tableName: 'estado',
});

