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
  },
  guests:{
    allowNull: false,
    type:DataTypes.INTEGER
  },
  bathrooms:{
    allowNull: false,
    type:DataTypes.DECIMAL
  },
  price:{
    allowNull: false,
    type:DataTypes.FLOAT
  },
  hostId:{
    allowNull: false,
    type:DataTypes.UUID,
    field: 'userId'
    
  },
  score:{
    allowNull: false,
    type:DataTypes.FLOAT,
  },
  placeId:{
    allowNull: false,
    type:DataTypes.UUID,
    // field:'place_id'
  },
  commision:{
    allowNull: false,
    type:DataTypes.FLOAT,
  },
  isActive:{
    allowNull: false,
    type:DataTypes.BOOLEAN,
    defaultValue: true,
    field:'is_active'
  }
})

module.exports = Accommodations;