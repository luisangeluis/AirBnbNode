const {db} = require('../utils/database');
const {DataTypes} = require('sequelize');
//Models
const Users = require('./user.model');
const Accomodations = require('./accommodations.model');
const Reservations = db.define('reservations',{
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    allowNull: false,
    type: DataTypes.UUID,
    field: "user_id",
    references: {
      model: Users,
      key: 'id'
    }
  },
  
  arrival:{
    type:DataTypes.DATE,
    allowNull:false
  },
  departure:{
    type:DataTypes.DATE,
    allowNull:false
  },
  accommodationId:{
    type:DataTypes.UUID,
    allowNull:false,
    field:"accommodation_id",
    references: {
      model: Accomodations,
      key: 'id'
    }
  },
  adults:{
    type:DataTypes.INTEGER,
    allowNull:false,
  },
  kids:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  babies:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  pets:{
    type:DataTypes.INTEGER,
    allowNull:false,
    defaultValue: 0,
  },
  score:{
    type: DataTypes.DECIMAL,
  },
  isFinished: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_finished",
  },
  isCanceled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    field: "is_canceled",
  }

});

module.exports = Reservations;
