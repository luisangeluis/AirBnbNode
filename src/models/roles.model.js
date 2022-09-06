const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Roles = require('roles', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
})

module.exports = Roles;