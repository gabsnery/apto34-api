import Sequelize from 'sequelize';
import { Client } from './client';
import { Deliver } from './deliver';
import { FiscalNote } from './nota';
import { Payment } from './payment';
const database = require('../config/database');

// Definindo o modelo para a tabela "pedido"
export const Pedido = database.define('pedido', {
  id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
  idPedidoStatus: { type: Sequelize.INTEGER, allowNull: false },
  idNotaFiscal: { type: Sequelize.INTEGER, allowNull: false },
  data_pedido_realizado: { type: Sequelize.DATE, allowNull: false },
  idCliente: { type: Sequelize.INTEGER, allowNull: false },
  idPagamento: { type: Sequelize.INTEGER, allowNull: false },
  idEntrega: { type: Sequelize.INTEGER, allowNull: false },
  pedido_concluido: { type: Sequelize.BOOLEAN, allowNull: false },
  data_pedido_concluido: { type: Sequelize.DATE, allowNull: true },
}, {
  tableName: 'pedido',
});



Pedido.belongsTo(Client, { foreignKey: 'idCliente', as: 'cliente' });
Pedido.belongsTo(Deliver, { foreignKey: 'idEntrega', as: 'entrega' });
Pedido.belongsTo(FiscalNote, { foreignKey: 'idNotaFiscal', as: 'notaFiscal' });
Pedido.belongsTo(Payment, { foreignKey: 'idPagamento', as: 'pagamento' });
/* Pedido.belongsTo(PedidoStatus, { foreignKey: 'idPedidoStatus', as: 'pedidoStatus' }); */
