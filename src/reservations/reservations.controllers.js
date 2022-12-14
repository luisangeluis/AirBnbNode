const uuid = require('uuid');
const Places = require('../models/places.model');
const Reservations = require('../models/reservations.model');
const Users = require('../models/user.model');
const Accommodations = require('../models/accommodations.model');

const getAllReservations = async () => {
  const data = await Reservations.findAll({
    include: [
      {
        model: Users,
        exclude: ['password', 'createdAt', 'updatedAt']
      },
      {
        model: Accommodations,
        as: 'accommodation'
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

  const { id, userId, accommodationId, isFinished, isCanceled, score, ...restOfData } = data;

  const response = await Reservations.update(
    { where: { id: reservationId } },
    ...restOfData
  )

  return response;
}

const getAllReservationsByUserId = async (userId) => {
  const data = await Reservations.findAll({
    where: { userId: userId }
  })

  return data;
}

const getMyReservationByUserId = async (userId, reservationId) => {
  const data = Reservations.findOne({
    where: {
      id: reservationId,
      userId: userId
    }
  })

  return data;
}

const getAllMyHostReservartions = async (userId) => {
  const response = await Reservations.findAll({
    // where: { accommodationId: accommodationId },
    include:
    {
      model: Accommodations,
      where: { userId }
    }

  })

  return response;
}

const getMyHostReservationById = async (hostId, reservationId) => {
  const response = await Reservations.findAll({
    where: { id: reservationId },
    include:
    {
      model: Accommodations,
      where: { userId:hostId }
    }

  })

  return response;
}

const cancelReservationAsHost = async (hostId, reservationId) => {
  const response = await Reservations.update(
    { isCanceled: true },
    { where: { id: reservationId } }
  )

  return response;
}

//Update score later the reservation has finished.
const updateAScore = async (reservationId, score) => {
  const scor = { score }
  // const response = await Reservations.findOne(
  //   { id: reservationId }
  // )
  const response = await Reservations.update(
    scor,
    {
      where: {
        id: reservationId,
        isFinished: true
      }
    }
  )
  console.log('response ', response);
  return response;
}




module.exports = {
  getAllReservations,
  getReservationById,
  createReservation,
  getAllReservationsByUserId,
  updateReservation,
  getMyReservationByUserId,
  getAllMyHostReservartions,
  getMyHostReservationById,
  cancelReservationAsHost,
  updateAScore
}