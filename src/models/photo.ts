import Sequelize from 'sequelize'
const database = require('../config/database');
export const Photo = database.define('photo', {
    url: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    is_cover: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'photo',
    timestamps: false
  });