const uuid = require('uuid');

const Accommodations = require('../models/accommodations.model');
const Places = require('../models/places.model');
const Users = require('../models/user.model')

const getAllAccommodations = async () => {
  const data = await Accommodations.findAll({
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId', 'placeId', 'hostId']
    },
    include: [
      { 
        model: Users,
        as: 'user',
        attributes:{
          exclude:['gender','password','birthdayDate','dni','roleId','address','verified','createdAt','updatedAt']
        }
      },
      { 
        model: Places,
        attributes:{
          exclude:['createdAt','updatedAt']
        }
      }
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
        model: Users,
        as: 'user',
        attributes: {
          exclude: ['createdAt', 'updatedAt','gender','password','birthdayDate','dni','roleId','address','verified']
        }
      }
    ]
  })
  return data;
}


const createAccommodation = async (hostId , data) => {
  const newAccommodation = await Accommodations.create({
    ...data,
    id: uuid.v4(),
    hostId: hostId,
    score: 0.00,
  })

  return newAccommodation;
}

const updateAccommodation = async (accommodationId, data) => {
  const { id, hostId, score, placeId, ...restOfData } = data;
  const response = await Accommodations.update(
    restOfData,
    { where: { id: accommodationId } }
  )
  return response;
}

const deleteAccommodation = async (accommodationId) => {
  const response = await Accommodations.destroy({ where: { id: accommodationId } });

  return response
}

const getAllMyAccommodations = async (userId) => {
  const response = await Accommodations.findAll({
    where: { hostId: userId },
    attributes: {
      exclude: ['createdAt', 'updatedAt', 'userId', 'placeId']
    },
    include: [
      {
        model: Places,
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        }
      }
    ]
  })

  return response;
}

const getMyAccommodationById = async (hostId, accommodationId) => {
  const response = Accommodations.findOne({
    where: {
      hostId: hostId,
      id: accommodationId
    }
  })

  return response;

}

const deleteMyAccommodationById = async (hostId, accommodationId) => {

  const response = await Accommodations.destroy({
    where: { hostId: hostId, id: accommodationId }
  })

  return response;
}

const editMyAccommodationById = async (userId, accommodationId, data) => {
  const { id, hostId, score, placeId, ...restOfData } = data;
  const response = await Accommodations.update(
    restOfData,
    {
      where: {
        hostId: userId,
        id:accommodationId
      }
    }
  )

  return response;
}

// const editMyAccommodationAndImageById = async (userId, accommodationId, data) => {
//   const { id, hostId, score, placeId, ...restOfData } = data;
//   const response = await Accommodations.update(
//     restOfData,
//     {
//       where: {
//         hostId: userId,
//         id:accommodationId
//       }
//     }
//   )

//   return response;
// }



module.exports = {
  getAllAccommodations,
  getAccommodationById,
  createAccommodation,
  updateAccommodation,
  deleteAccommodation,
  getAllMyAccommodations,
  getMyAccommodationById,
  deleteMyAccommodationById,
  // editMyAccommodationById
}

