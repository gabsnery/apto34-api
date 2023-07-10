import Sequelize from 'sequelize'
import { Color } from './color';
const database = require('../config/database');
export const Product = database.define('produto', {
    nome: { type: Sequelize.STRING, default: null },
    descricao: { type: Sequelize.STRING, unique: true },
    desativado: { type: Sequelize.BOOLEAN },
    data_desativacao: { type: Sequelize.DATE, default: null },
})


const Produto_tem_cor = database.define('produto_tem_cor', {
}, { timestamps: false });
Product.belongsToMany(Color, { through: Produto_tem_cor });
Color.belongsToMany(Product, { through: Produto_tem_cor });