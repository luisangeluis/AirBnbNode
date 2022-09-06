const { DataTypes } = require('sequelize');
const { db } = require('../utils/database');

const Accommodations = db.define('Accommodations', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  title: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  description: {
    allowNull: false,
    type: DataTypes.STRING,
  }
  // guests:{
  //   allowNull: false

  // }
})