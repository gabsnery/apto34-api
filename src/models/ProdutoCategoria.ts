import Sequelize from 'sequelize'
const database = require('../config/database');
  
export const ProdutoCategoria = database.define('produto_categoria', {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    data_criacao: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    categoria: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    descricao_categoria: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    desativado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'produto_categoria',
    timestamps: false,
  });
  