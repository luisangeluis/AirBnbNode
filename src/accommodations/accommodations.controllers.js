const Accommodations = require('../models/accommodations.model');
const Places = require('../models/places.model');
const Users = require('../models/user.model')

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    attributes: {
      exclude: ['createdAt','updatedAt','userId','placeId','hostId']
    },
    include: {
      model: Places,
      attributes:{
        exclude:['createdAt','updatedAt']
      }
    }
  })
  return data;
}

const getAccommodationById = async (id) => {
  const data = await Accommodations.findOne({
    where: { id: id },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
    },
    include: {
      model: Places,
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    }
  })
  return data;
}


module.exports = {
  getAllAccommodations,
  getAccommodationById
}
