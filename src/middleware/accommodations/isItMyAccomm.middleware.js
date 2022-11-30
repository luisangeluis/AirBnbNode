const Accommodations = require('../../models/accommodations.model');

const isItMyAccommMiddleware = (req, res, next) => {
  const userId = req.user.id;
  const accommodationId = req.params.id;

  Accommodations.findOne({
    where: {
      id: accommodationId,
      userId
    }
  }).then(response => {
    if (response)
      next();
    else
      return res.status(404).json({ message: `Accommodation with id:${accommodationId} doesn't exist` })
  })
    .catch(error => res.status(400).json({ message: error.message }))
}

module.exports = {
  isItMyAccommMiddleware
}