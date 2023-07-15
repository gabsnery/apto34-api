import Sequelize from 'sequelize'
import { ProdutoCategoria } from './ProdutoCategoria';
const database = require('../config/database');
export const ProdutoSubcategoria = database.define('produto_subcategoria', {
    data_criacao: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    subcategoria: {
      type: Sequelize.STRING(100),
      allowNull: false,
    },
    descricao_subcategoria: {
      type: Sequelize.STRING(150),
      allowNull: false,
    },
    desativado: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  }, {
    tableName: 'produto_subcategoria',
    timestamps: false,
  });
  
  ProdutoSubcategoria.belongsTo(ProdutoCategoria, {
    foreignKey: 'produtoCategoriaId',
    as: 'produtoCategoria',
  });