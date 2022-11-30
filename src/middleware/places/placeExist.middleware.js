const Places = require('../../models/places.model');

const placeExistMiddleware = (req, res, next) => {
  const placeId = req.params.id;

  Places.findOne({ where: { id: placeId } })
    .then(response => {
      console.log('la response', response);
      if (response)
        next();
      else
        return res.status(404).json({ message: `Place with id:${placeId} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

module.exports = {
  placeExistMiddleware
}
