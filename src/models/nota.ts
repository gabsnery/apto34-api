import Sequelize from 'sequelize';
const database = require('../config/database');

// Definindo o modelo para a tabela "nota_fiscal"
export const FiscalNote = database.define('nota_fiscal', {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  data_emissao_nota: { type: Sequelize.DATE, allowNull: false },
  numero_nota: { type: Sequelize.INTEGER, allowNull: false, unique: true },
  valor_nota: { type: Sequelize.FLOAT, allowNull: false },
}, {
  tableName: 'nota_fiscal',
});