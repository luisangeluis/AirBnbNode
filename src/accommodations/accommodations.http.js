const Accommodations = require('./accommodations.controllers');

const getAll = (req, res) => {
  Accommodations.getAllAccommodations()
    .then(response => {
      return res.status(200).json({ items: response.length, response });
    })
    .catch(error => {
      return res.status(400).json(error);
    });
}

const getById = (req, res) => {
  const id = req.params.id;
  Accommodations.getAccommodationById(id)
    .then(response => {
      return res.status(200).json(response);
    })
    .catch(error => {
      return res.status(404).json({ message: `The user with id:${id} doesn't exist` });
    });
}

const editAccomodation = (req, res) => {
  const accommodationId = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  Accommodations.updateAccommodation(accommodationId, data)
    .then(response => {
      if (response) {
        res.status(200).json({ message: `Accommodation with id:${accommodationId} edited succesfully` })

      } else {
        res.status(404).json({ message: `The accommodation with id:${accommodationId} doesn't exist` })
      }
    })
    .catch(error => {
      res.status(400).json(error.message)

    })
}

const remove =(req,res)=>{
  const accommodationid = req.params.id;

  Accommodations.deleteAccommodation(accommodationid)
    .then(response=>{
      if (response) {
        return res.status(204).json();
      }
      else {
        return res.status(400).json({ message: 'Invalid Id' });
      }
    })
    .catch(error=>{
      return res.status(400).json(error.message);
    } )
}



module.exports = {
  getAll,
  getById,
  editAccomodation,
  remove
}