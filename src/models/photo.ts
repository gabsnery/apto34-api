import Sequelize from 'sequelize'
const database = require('../config/database');
export const Photo = database.sequelize.define('photo', {
    url: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    is_cover: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    thumbnail: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    file_name: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
    host: {
      type: Sequelize.STRING(255),
      allowNull: true
    },
  }, {
    tableName: 'photo',
    timestamps: false
  });