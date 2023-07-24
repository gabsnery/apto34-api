import Sequelize from 'sequelize'
import { Color } from './color';
import { Photo } from './photo';
import { ProdutoSubcategoria } from './ProdutoSubcategoria';
import { Size } from './size';
const database = require('../config/database');
export const Product = database.define('produto', {
  nome: { type: Sequelize.STRING, default: null },
  descricao: { type: Sequelize.STRING },
  desativado: { type: Sequelize.BOOLEAN },
  valor_produto: { type: Sequelize.FLOAT },
  quantity: { type: Sequelize.NUMBER },
})



const ProdutoTemSubcategoria = database.define('produto_tem_subcategoria', {
}, {
  tableName: 'produto_tem_subcategoria',
  timestamps: false,
});

ProdutoSubcategoria.belongsToMany(Product, {
  through: ProdutoTemSubcategoria,
});
Product.belongsToMany(ProdutoSubcategoria, {
  through: ProdutoTemSubcategoria,
  as: 'produtoSubcategoria',
});

export const Produto_tem_cor = database.define('produto_tem_cor', {
  quantidade: { type: Sequelize.INTEGER },
}, { timestamps: false });
Product.belongsToMany(Color, {
  through: Produto_tem_cor,
  foreignKey: 'produtoId',
  as: 'color'
});
Color.belongsToMany(Product, {
  through: Produto_tem_cor,
  foreignKey: 'corId',
  as: 'product'
});

export const Produto_tem_size = database.define('produto_tem_tamanho', {
  quantity: { type: Sequelize.INTEGER },
}, { timestamps: false });
Product.belongsToMany(Size, {
  through: Produto_tem_size,
  foreignKey: 'produtoId',
  as: 'size'
});
Size.belongsToMany(Product, {
  through: Produto_tem_size,
  foreignKey: 'tamanhoId',
  as: 'product'
});

export const produto_tem_photo = database.define('produto_tem_photo', {
  is_cover: { type: Sequelize.BOOLEAN },
}, { timestamps: false });
Product.belongsToMany(Photo, {
  through: produto_tem_photo,
  foreignKey: 'produtoId',
  as: 'photo'
});
Photo.belongsToMany(Product, {
  through: produto_tem_photo,
  foreignKey: 'photoId',
  as: 'product'
});