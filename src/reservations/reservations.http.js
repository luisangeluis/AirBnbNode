const reservationsControllers = require('./reservations.controllers');

const getAll = (req, res) => {
  reservationsControllers.getAllReservations()
    .then(response => {
      res.status(200).json({ items: response.length, reservations: response })
    })
    .catch(error => {
      res.status(400).json({ error })
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

  reservationsControllers.createReservation(userId, accommodationId, data)
    .then(response => {
      res.status(201).json(response)
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
const getHostReservations =(req,res)=>{
  const hostId = req.user.id;
  const accommodationId = req.params.id;

  console.log('El iD',accommodationId);

  reservationsControllers.getAllMyHostReservartions(hostId,accommodationId)
    .then(response=>{
      if(response) return res.status(200).json(response)
      
      return res.status(404).json({ message: `The accommodation with id: ${id} doesn't exist` });

    })
    .catch(error=>{
      return res.status(400).json({message:error.message})
    })
}


module.exports = {
  getAll,
  getById,
  postReservation,
  getAllMyReservations,
  getHostReservations
}