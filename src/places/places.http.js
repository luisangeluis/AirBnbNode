const placesControllers = require('./places.controllers');

const getAll = (req, res) => {
  placesControllers.readAllPlaces()
    .then(response => {
      console.log(response);
      res.status(200).json({ items: response.length, places: response })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const getById = (req, res) => {
  const placeId = req.params.id;

  placesControllers.readPlaceById(placeId)
    .then(response => {
      // console.log(response);
      if (response)
        return res.status(200).json(response)
      else
        return res.status(404).json({ message: `Place with id:${placeId} doesn't exist` })
    })
    .catch(error => {
      return res.status(400).json({ message: error.message });
    })
}

const post = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.city || !data.state || !data.country || !data.continent) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        city: 'Type a city',
        state: 'Type a state',
        country: 'Type a country',
        continent: 'Type a continent'
      }
    })
  }

  placesControllers.createPlace(data)
    .then(response => {
      console.log(response);
      return res.status(201).json({ message: `Place with id:${response.id}` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const edit = (req, res) => {
  const placeId = req.params.id;
  const data = req.body;
  console.log('el servicio',placeId);
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  placesControllers.updatePlace(placeId, data)
    .then(response => {
      return res.status(200).json({ message: `Place with id:${placeId} edited successfully` })
    })
    .catch(error => res.status(400).json({ message: error.message }))

}

const remove=(req,res)=>{
  const placeId = req.params.id;

  placesControllers.deletePlace(placeId)
    .then(response=>{
      console.log(response);
    })
    .catch(error=>res.status(400).json({message:error.message}))
}

const changeIsActive = (req, res) => {
  const placeId = req.params.id;

  placesControllers.updateIsActive(placeId)
    .then(response => {
      console.log(response);
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

module.exports = {
  getAll,
  getById,
  post,
  edit,
  remove,
  changeIsActive
}

