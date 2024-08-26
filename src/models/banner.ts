import Sequelize from "sequelize";
import { Address } from "./adress";
const database = require("../config/database");

// Definindo o modelo para a tabela "entrega"
export const Banner = database.sequelize.define(
  "banner",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: Sequelize.STRING(35), allowNull: false },
    description: { type: Sequelize.STRING(800), allowNull: true },
    url_image: { type: Sequelize.STRING(255), allowNull: true },
    active_until: { type: Sequelize.DATE, allowNull: true },
    id_type: { type: Sequelize.INTEGER, allowNull: false },
  },
  {
    tableName: "banner",
    timestamps: false
  }
);

export const BannerType = database.sequelize.define(
  "banner_type",
  {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nome: { type: Sequelize.STRING(255), allowNull: false },
  },
  {
    tableName: "banner_type",
    timestamps: false
  }
);

  Banner.belongsTo(BannerType, { foreignKey: 'id_type', as: 'type' });
