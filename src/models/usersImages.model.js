const {db} =require('../utils/database');
const {DataTypes} = require('sequelize');

const UsersImages = db.define('users_images',{
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  ur:{
    type: DataTypes.STRING,
    allowNull:false,
    validate:{
      isUrl:true
    }

  },
  userId:{
    type: DataTypes.UUID,
    allowNull:false,
    fields:'user_id'
  }
})

module.exports = UsersImages;