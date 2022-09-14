const uuid = require('uuid');
const Places = require('../models/places.model');
const Reservations = require('../models/reservations.model');
const Users = require('../models/user.model');
const Accommodations = require('../models/accommodations.model');

const getAllReservations = async () => {
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

const getReservationById = async (id) => {
  const data = await Reservations.findOne({
    where: { id: id }
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

const updateReservation = async (reservationId, data) => {

  const { id, userId, accommodationId, isFinished, isCanceled, restOfData } = data;

  const response = await Reservations.update(
    { where: { id: reservationId } },
    restOfData
  )
}

const getAllReservationsByUserId = async (userId) => {
  const data = await Reservations.findAll({
    where: { userId: userId }
  })

  return data;
}

const getMyReservationByUserId = async (userId,reservationId) => {
  const data =Reservations.findOne({
      where:{
        id:reservationId,
        userId:userId
      }
  })

  return data;
}

module.exports = {
  getAllReservations,
  createReservation,
  getAllReservationsByUserId,
  updateReservation,
  getMyReservationByUserId
}