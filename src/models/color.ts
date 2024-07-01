import Sequelize from 'sequelize'
const database = require('../config/database');
export const Color = database.sequelize.define('cor', {
    descricao: { type: Sequelize.STRING, default: null },
}, {
    tableName: 'cor',
    timestamps: false
  });
