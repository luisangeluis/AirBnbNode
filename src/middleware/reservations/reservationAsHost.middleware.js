const Reservation = require('../../models/reservations.model');
const Accommodations = require('../../models/accommodations.model');

const reservationAsHostExistMiddleware = (req, res, next) => {
  const hostId = req.user.id;
  const reservationId = req.params.reservationId;
  Reservation.findOne({
    where: { id: reservationId },
    include: {
      model: Accommodations,
      where: { userId: hostId }
    }
  })
    .then(response => {
      // console.log({response});
      if (response) {
        next();
      } else {
        return res.status(404).json({ message: `Reservation with id:${reservationId} doesn't exist ` })
      }

    })
    .catch(error => {
      // console.log(error.message);
      return res.status(400).json({ message: error.message });
    })
}

module.exports = {
  reservationAsHostExistMiddleware
}