import Sequelize from 'sequelize';
import { Client } from './client';
import { Deliver } from './deliver';
import { FiscalNote } from './nota';
import { Payment } from './payment';
import { Product } from './product';
const database = require('../config/database');

// Definindo o modelo para a tabela "pedido"
export const Pedido = database.sequelize.define('pedido', {
  idPedidoStatus: { type: Sequelize.INTEGER, allowNull: false },
  total: { type: Sequelize.FLOAT, allowNull: true },
  idNotaFiscal: { type: Sequelize.INTEGER, allowNull: true },
  data_pedido_realizado: { type: Sequelize.DATE, allowNull: false },
  idCliente: { type: Sequelize.INTEGER, allowNull: false },
  idPagamento: { type: Sequelize.INTEGER, allowNull: true },
  idEntrega: { type: Sequelize.INTEGER, allowNull: false },
  pedido_concluido: { type: Sequelize.BOOLEAN, allowNull: false },
  data_pedido_concluido: { type: Sequelize.DATE, allowNull: true },
}, {
  tableName: 'pedido',
});



Pedido.belongsTo(Client, { foreignKey: 'idCliente', as: 'cliente' });
Pedido.belongsTo(Deliver, { foreignKey: 'idEntrega', as: 'entrega',allowNull: false, });
Pedido.belongsTo(FiscalNote, { foreignKey: 'idNotaFiscal', as: 'notaFiscal',allowNull: false, });
Pedido.belongsTo(Payment, { foreignKey: 'idPagamento', as: 'pagamento',allowNull: false, });
/* Pedido.belongsTo(PedidoStatus, { foreignKey: 'idPedidoStatus', as: 'pedidoStatus' }); */

export const PedidoTemProdutos = database.sequelize.define('pedido_tem_produto', {
  quantidade: { type: Sequelize.INTEGER, allowNull: true,},

}, {
  tableName: 'pedido_tem_produto',
  as: 'pedido_tem_produto',
});
Product.belongsToMany(Pedido, {
  through: PedidoTemProdutos,
  as: 'pedido',
  foreignKey: 'idProduto',
});
Pedido.belongsToMany(Product, {
  through: PedidoTemProdutos,
  foreignKey: 'idPedido',
  as: 'products'
});