const placesControllers = require('./places.controllers');

const getAll = (req, res) => {
  placesControllers.readAllPlaces()
    .then(response => res.status(200).json({ items: response.length, places: response }))
    .catch(error => res.status(400).json({ message: error.message }))
}

const getById =(req,res)=>{
  const placeId = req.params.id;

  placesControllers.readPlaceById(placeId)
    .then(response=>{
      return res.status(200).json(response)
    })
    .catch(error=>{
      return res.status(404
        ).json({message:error.message});
    })
}

