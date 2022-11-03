const reservationsControllers = require('./reservations.controllers');

const getAll = (req, res) => {
  reservationsControllers.getAllReservations()
    .then(response => {
      res.status(200).json({ items: response.length, reservations: response })
    })
    .catch(error => {
      res.status(400).json({ message: error.message })
    })
}

const getById = (req, res) => {
  const reservationId = req.params.reservationId;

  reservationsControllers.getReservationById(reservationId)
    .then(response => {
      if (response) {
        return res.status(200).json(response)
      } else {
        return res.status(404).json({ message: `The reservation with id: ${id} doesn't existe` });
      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const postReservation = (req, res) => {
  const accommodationId = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.arrival || !data.departure || !data.adults) {
    return res.status(400).json({
      message: 'You must complete at least this fields',
      fields: {
        arrival: 'Arrival date',
        departure: 'Departure date',
        adults: 'Type with number how many adults there are'
      }
    })
  }

  //TODO Buscar donde validar si existe el lugar que queremos reservar.
  //TODO Buscar si esta disponible la fecha a reservar.
  //TODO Comprobar si la fecha es posterior a la fecha actual para reservar.
  reservationsControllers.createReservation(userId, accommodationId, data)
    .then(response => {
      return res.status(201).json(response)
    })
    .catch(error => {
      res.status(400).json({ status: 400, message: error.message })
    });

}

const getAllMyReservations = (req, res) => {
  const userId = req.user.id;

  reservationsControllers.getAllReservationsByUserId(userId)
    .then(response => {
      if (response) {
        return res.status(200).json(response);
      }
      return res.status(404).json({ message: `The user with id ${userId} doesn't exist` });

    })
    .catch(error => {
      res.status(404).json({ status: 404, message: error.message })
    });
}

//REVIS
const getHostReservations = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;

  console.log('El iD', accommodationId);

  reservationsControllers.getAllMyHostReservartions(hostId, accommodationId)
    .then(response => {
      if (response) return res.status(200).json(response)

      return res.status(404).json({ message: `The accommodation with id: ${id} doesn't exist` });

    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const getAllHostReservations = (req, res) => {
  const hostId = req.user.id;

  reservationsControllers.getAllMyHostReservartions(hostId)
    .then(response => {
      if (response) return res.status(200).json({ items: response.length, reservations: response })
      else return res.status(404).json({ message: `The host with id ${hostId} doesn't exist` })
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const getHostReservationById = (req, res,) => {
  const hostId = req.user.id;
  const reservationId = req.params.reservationId;

  reservationsControllers.getMyHostReservationById(hostId, reservationId)
    .then(response => {
      if (response) return res.status(200).json({ items: response.length, reservations: response })
      else return res.status(404).json({ message: `The host with id ${hostId} doesn't exist` })
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const cancelAsHost = (req, res) => {
  const hostId = req.user.id;
  const reservationId = req.params.reservationId;

  reservationsControllers.cancelReservationAsHost(hostId, reservationId)
    .then(response => {
      if (response)
        res.status(200).json({ message: `Reservation with id:${reservationId} successfully canceled.` })
      else
        res.status(404).json({ message: `Reservation with id${reservationId} doesn't exist.` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

//Guest give a score with finished reservation.
const giveAScore = (req, res) => {
  const reservationId = req.params.id;
  const userId = req.user.id;
  const score = req.body.score;
  
  //TODO Set the score range
  if (!score) {
    return res.status(400).json({
      message: 'You must complete at least this fields',
      fields: {
        score: 'Type a score',
      }
    })
  }

  reservationsControllers.updateAScore(reservationId, userId,score)
    .then(response => {
      console.log(response);
      // if (response)
        return res.status(200).json({ message: `Reservation score with id:${reservationId} edited successfully.` })
      // else
      //   return res.status(404).json({ message: `Reservation wit id:${reservationId} doesn't exist.` })
    })
    .catch(error => res.status(400).json({ message: error.message }))

}

module.exports = {
  getAll,
  getById,
  postReservation,
  getAllMyReservations,
  getHostReservations,
  getAllHostReservations,
  getHostReservationById,
  cancelAsHost,
  giveAScore
}