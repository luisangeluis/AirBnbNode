const { db } = require('../utils/database');
const { DataTypes } = require('sequelize');

const AccommodationsImages = db.define('accommodations_images', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  accommodationId: {
    type: DataTypes.UUID,
    allowNull: false,
    fields: 'accommodations_id'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isURL:[{
        require_tld: false
      }]
    }
  }
});

module.exports = AccommodationsImages;