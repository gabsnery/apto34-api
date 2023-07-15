import Sequelize from 'sequelize'
import { Color } from './color';
import { ProdutoSubcategoria } from './ProdutoSubcategoria';
const database = require('../config/database');
export const Product = database.define('produto', {
  nome: { type: Sequelize.STRING, default: null },
  descricao: { type: Sequelize.STRING },
  desativado: { type: Sequelize.BOOLEAN },
  valor_produto: { type: Sequelize.FLOAT },
})


const Produto_tem_cor = database.define('produto_tem_cor', {
  quantidade: { type: Sequelize.INTEGER },
}, { timestamps: false });
Product.belongsToMany(Color, { through: Produto_tem_cor });
Color.belongsToMany(Product, { through: Produto_tem_cor });

const ProdutoTemSubcategoria = database.define('produto_tem_subcategoria', {
}, {
  tableName: 'produto_tem_subcategoria',
  timestamps: false,
});

ProdutoSubcategoria.belongsToMany(Product, {
  through: ProdutoTemSubcategoria,
});
Product.belongsToMany(ProdutoSubcategoria, { 
  through: ProdutoTemSubcategoria ,
  as: 'produtoSubcategoria',
});