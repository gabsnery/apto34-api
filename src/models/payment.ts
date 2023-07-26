import Sequelize from 'sequelize';
const database = require('../config/database');

// Definindo o modelo para a tabela "pagamento"
export const Payment = database.define('pagamento', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    id_pagamento_tipo: { type: Sequelize.INTEGER, allowNull: false },
    parcelado: { type: Sequelize.BOOLEAN, allowNull: true },
    quantidade_parcelas: { type: Sequelize.INTEGER, allowNull: true },
    id_boleto: { type: Sequelize.INTEGER, allowNull: true },
    pagamento_confirmado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_pagamento_confirmado: { type: Sequelize.DATEONLY, allowNull: true },
}, {
    tableName: 'pagamento',
});

export const PagamentoTipo = database.define('pagamento_tipo', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    data_criacao: { type: Sequelize.DATE, allowNull: true },
    tipo_pagamento: { type: Sequelize.STRING(45), allowNull: false },
    desativado: { type: Sequelize.BOOLEAN, allowNull: false },
    data_desativacao: { type: Sequelize.DATE, allowNull: true },
}, {
    tableName: 'pagamento_tipo',
});
export const Boleto = database.define('boleto', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    data_emissao_boleto: { type: Sequelize.DATE, allowNull: false },
    numero_boleto: { type: Sequelize.STRING(48), allowNull: false, unique: true },
    valor_boleto: { type: Sequelize.FLOAT, allowNull: false },
    boleto_pago: { type: Sequelize.BOOLEAN, allowNull: false },
    data_pagamento_boleto: { type: Sequelize.DATE, allowNull: true },
}, {
    tableName: 'boleto',
});
Payment.belongsTo(PagamentoTipo, { foreignKey: 'id_pagamento_tipo', as: 'pagamentoTipo' });
Payment.belongsTo(Boleto, { foreignKey: 'id_boleto', as: 'boleto' });

