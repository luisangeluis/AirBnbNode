const uuid = require('uuid');
const Places = require('../models/places.model');
const Reservations = require('../models/reservations.model');

const getAllReservations = () => {
  const data = Reservations.findAll({
    include: [
      {
        model: Users, as: 'user', attributes: {
          exclude: ['password']
        }
      },
      {
        model: Places, as: 'place'
      }
    ]
  })

}

const createReservation = async (userId, accommodationId, data) => {
  const { isFinished, isCanceled, ...restOfProperties } = data;
  
  const newReservation = await Reservations.create({
    ...restOfProperties,
    id: uuid.v4(),
    userId: userId,
    accommodationId: accommodationId,
    score:0.0
  })

  return newReservation;
}

module.exports={
  getAllReservations,
  createReservation
}