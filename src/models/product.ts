import Sequelize, { DataTypes } from "sequelize";
import { Color } from "./color";
import { Photo } from "./photo";
import { ProdutoSubcategoria } from "./ProdutoSubcategoria";
import { Size } from "./size";
const database = require("../config/database");
export const Product = database.sequelize.define("produto", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  nome: { type: Sequelize.STRING, default: null },
  descricao: { type: Sequelize.STRING },
  desativado: { type: Sequelize.BOOLEAN },
  valor_produto: { type: Sequelize.FLOAT },
  quantity: { type: Sequelize.INTEGER },
  discount: { type: Sequelize.INTEGER,default:0 },
});

const ProdutoTemSubcategoria = database.sequelize.define(
  "produto_tem_subcategoria",
  {},
  {
    tableName: "produto_tem_subcategoria",
    timestamps: false,
  }
);
Product.belongsToMany(ProdutoSubcategoria, {
  through: ProdutoTemSubcategoria,
  as: "produtoSubcategoria",
  foreignKey: "produtoId",
});
ProdutoSubcategoria.belongsToMany(Product, {
  through: ProdutoTemSubcategoria,
  foreignKey: "produtoSubcategoriumId",
  as: "product",
});

export const produto_tem_photo = database.sequelize.define(
  "produto_tem_photo",
  {
    is_cover: { type: Sequelize.BOOLEAN },
  },
  { timestamps: false }
);
Product.belongsToMany(Photo, {
  through: produto_tem_photo,
  foreignKey: "produtoId",
  as: "photo",
});
Photo.belongsToMany(Product, {
  through: produto_tem_photo,
  foreignKey: "photoId",
  as: "product",
});

export const Stock = database.sequelize.define("stock", {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE'
  },
  colorId: {
    type: Sequelize.INTEGER,
    references: {
      model: Color,
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE'
  },
  sizeId: {
    type: Sequelize.INTEGER,
    references: {
      model: Size,
      key: 'id'
    },
    allowNull: false,
    onDelete: 'CASCADE'
  },
  quantity: { 
    type: Sequelize.INTEGER, 
    allowNull: false 
  },
  reserved_quantity: { 
    type: Sequelize.INTEGER, 
    allowNull: false ,
    default:0
  },
  fulfilled_quantity: { 
    type: Sequelize.INTEGER, 
    allowNull: false ,
    default:0
  },
}, {
  tableName: 'stock',
  timestamps: false
});


Product.hasMany(Stock, { foreignKey: 'productId', as: 'stock_product' });
Stock.belongsTo(Product, { foreignKey: 'productId' });

Color.hasMany(Stock, { foreignKey: 'colorId' });
Stock.belongsTo(Color, { foreignKey: 'colorId', as: 'stock_color' });

Size.hasMany(Stock, { foreignKey: 'sizeId'});
Stock.belongsTo(Size, { foreignKey: 'sizeId', as: 'stock_size'  });