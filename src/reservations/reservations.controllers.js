const uuid = require('uuid');
const Places = require('../models/places.model');
const Reservations = require('../models/reservations.model');
const Users = require('../models/user.model');
const Accommodations =require('../models/accommodations.model');

const getAllReservations = async() => {
  const data = await Reservations.findAll({
    include: [
      {
        model: Users
      },
      {
        model: Accommodations
      }
    ]
  })
  return data;
}

const createReservation = async (userId, accommodationId, data) => {
  const { isFinished, isCanceled, ...restOfProperties } = data;

  const newReservation = await Reservations.create({
    ...restOfProperties,
    id: uuid.v4(),
    userId: userId,
    accommodationId: accommodationId,
    score: 0.0
  })

  return newReservation;
}

module.exports = {
  getAllReservations,
  createReservation
}