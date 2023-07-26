import Sequelize from 'sequelize';
import { State } from './state';
const database = require('../config/database');

// Definindo o modelo para a tabela "cidade"
export const City = database.define('cidade', {
  id_cidade: { type: Sequelize.INTEGER, primaryKey: true },
  cidade: { type: Sequelize.STRING(60), allowNull: false },
  id_estado: { type: Sequelize.INTEGER, allowNull: false },
}, {
  tableName: 'cidade',
});

// Definindo associação com a tabela "estado"
City.belongsTo(State, {
  foreignKey: 'id_estado',
  as: 'estado',
});

module.exports = City;
