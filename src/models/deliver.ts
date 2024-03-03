import Sequelize from 'sequelize';
import { Address } from './adress';
const database = require('../config/database');

// Definindo o modelo para a tabela "entrega"
export const Deliver = database.define('entrega', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true  },
    id_entrega_status: { type: Sequelize.INTEGER, allowNull: false },
    data_entrega_inicio: { type: Sequelize.DATE, allowNull: true },
    valor_frete: { type: Sequelize.FLOAT, allowNull: true },
    codigo_rastreio: { type: Sequelize.STRING(15), allowNull: true },
    idEndereco: { type: Sequelize.INTEGER, allowNull: false },
    idTransportadora: { type: Sequelize.INTEGER, allowNull: false },
    idTelefone: { type: Sequelize.INTEGER, allowNull: true },
    data_entrega_previsao: { type: Sequelize.DATE, allowNull: true },
    entrega_concluida: { type: Sequelize.BOOLEAN, allowNull: true },
    data_entrega_fim: { type: Sequelize.DATE, allowNull: true },
}, {
    tableName: 'entrega',
});

export const EntregaStatus = database.define('entrega_status', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    data_criacao: { type: Sequelize.DATE, allowNull: true },
    status_entrega: { type: Sequelize.STRING(45), allowNull: false },
    desativado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_desativacao: { type: Sequelize.DATE, allowNull: true },
}, {
    tableName: 'entrega_status',
});
export const Telefone = database.define('telefone', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    telefone: { type: Sequelize.STRING(14), allowNull: false, unique: true },
    id_ddd: { type: Sequelize.INTEGER, allowNull: false },
}, {
    tableName: 'telefone',
    timestamps: false,
});

export const Transportadora = database.define('transportadora', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    data_criacao: { type: Sequelize.DATE, allowNull: false },
    id_unidade: { type: Sequelize.INTEGER, allowNull: false, unique: true },
    desativado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_desativacao: { type: Sequelize.DATE, allowNull: true },
}, {
    tableName: 'transportadora',
    timestamps: false,
});
// Definindo o modelo para a tabela "unidade"
export const Unidade = database.define('unidade', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    idEmpresa: { type: Sequelize.INTEGER, allowNull: false },
    data_criacao: { type: Sequelize.DATE, allowNull: false },
    razao_social: { type: Sequelize.STRING(255), allowNull: false },
    nome_fantasia: { type: Sequelize.STRING(255), allowNull: false },
    cnpj: { type: Sequelize.CHAR(14), allowNull: false, unique: true },
    idTelefone: { type: Sequelize.INTEGER, allowNull: false },
    idEndereco: { type: Sequelize.INTEGER, allowNull: false },
    desativado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_desativacao: { type: Sequelize.DATE, allowNull: true },
  }, {
    tableName: 'unidade',
    timestamps: false,
    underscored: true,
  });
  
  export const Empresa = database.define('empresa', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    data_criacao: { type: Sequelize.DATE, allowNull: false },
    nome: { type: Sequelize.STRING(255), allowNull: false },
    desativado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_desativacao: { type: Sequelize.DATE, allowNull: true },
  }, {
    tableName: 'empresa',
  });
  Unidade.belongsTo(Empresa, { foreignKey: 'idEmpresa', as: 'empresa' });
  Unidade.belongsTo(Telefone, { foreignKey: 'idTelefone', as: 'telefone' });
  Unidade.belongsTo(Address, { foreignKey: 'idEndereco', as: 'endereco' });
  
Transportadora.belongsTo(Unidade, { foreignKey: 'id_unidade', as: 'unidade' });

export const DDD = database.define('ddd', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    ddd: { type: Sequelize.INTEGER, allowNull: false, unique: true },
}, {
    tableName: 'ddd',
});

Telefone.belongsTo(DDD, { foreignKey: 'id_ddd', as: 'ddd' });

Deliver.belongsTo(Address, { foreignKey: 'idEndereco', as: 'endereco' });
Deliver.belongsTo(EntregaStatus, { foreignKey: 'id_entrega_status', as: 'entregaStatus' });
Deliver.belongsTo(Telefone, { foreignKey: 'idTelefone', as: 'telefone' });
Deliver.belongsTo(Transportadora, { foreignKey: 'idTransportadora', as: 'transportadora' });

