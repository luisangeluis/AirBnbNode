const Accommodations = require('../models/accommodations.model');
const Places = require('../models/places.model');
const Users = require('../models/user.model')

//
//TO DO HACER RESERVATIONS
//

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
    },
    include: [
      { model: Users, as: 'user' },
      { model: Places }
    ]
  })
  return data;
}

const getAccommodationById = async (id) => {
  const data = await Accommodations.findOne({
    where: { id: id },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
    },
    include: [
      {
        model: Places,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      },
      {
        model:Users,
        as:'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  })
  return data;
}


const createAccommodation = async (hostId, placeId, data) => {
  const newAccommodation = await Accommodations.create({
    ...data,
    id: uuid.v4(),
    hostId: hostId,
    score: 0.00,
    placeId: placeId,
  })

  return newAccommodation;
}

module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation
}

