import Sequelize from 'sequelize';
import { City } from './city';
const database = require('../config/database');

export const Address = database.sequelize.define('endereco', {
  cep: { type: Sequelize.STRING(8), allowNull: false },
  logradouro: { type: Sequelize.STRING(100), allowNull: false },
  numero: { type: Sequelize.INTEGER, allowNull: false },
  complemento: { type: Sequelize.STRING(255), allowNull: true },
  bairro: { type: Sequelize.STRING(60), allowNull: false },
  id_cidade: { type: Sequelize.INTEGER, allowNull: false },
}, {
  tableName: 'endereco',
});

Address.belongsTo(City, {
  foreignKey: 'id_cidade',
  as: 'cidade',
});

