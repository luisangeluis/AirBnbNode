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
      return res.status(404).json({ message: `The Accommodation with id:${id} doesn't exist` });
    });
}

const post = (req, res) => {
  const data = req.body;
  const userId = req.user.id;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.title || !data.description || !data.guests || !data.bathrooms || !data.price || !data.placeId ||
    !data.commision) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        title: 'Type a string',
        description: 'Type a string',
        guests: 'Type a num',
        bathrooms: 'Type a num',
        price: 'Type a price',
        placeId: 'Type an id',
        commision: 'Type a commision'
      }
    })
  }

  Accommodations.createAccommodation(userId, data)
    .then(response => {
      return res.status(201).json({
        message: `Accommodation created successfully`,
        accommodation: response
      })
    })
    .catch(error => res.status(400).json({ message: error.message }))
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
        return res.status(200).json({ message: `Accommodation with id:${accommodationId} edited succesfully` })

      } else {
        return res.status(404).json({ message: `The accommodation with id:${accommodationId} doesn't exist` })
      }
    })
    .catch(error => {
      res.status(400).json(error.message)

    })
}

const remove = (req, res) => {
  const accommodationid = req.params.id;

  Accommodations.deleteAccommodation(accommodationid)
    .then(response => {
      if (response) {
        return res.status(204).json();
      }
      else {
        return res.status(404).json({ message: 'Invalid Id' });
      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message });
    })
}

const getMyAccommodations = (req, res) => {
  const userId = req.user.id;

  Accommodations.getAllMyAccommodations(userId)
    .then(response => {

      if (response) {
        return res.status(200).json({ items: response.length, response })
      } else {
        return res.status(400).json({ message: `The user with id ${userId} doesn't exist` })
      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const getMyAccommodation = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;

  Accommodations.getMyAccommodationById(hostId, accommodationId)
    .then(response => {
      if (response) {
        return res.status(200).json(response)
      } else {
        return res.status(404).json({ message: `The Accommodation with id:${accommodationId} doesn't exist` });
      }
    })
    .catch(error => {
      console.log({ error });
      return res.status(400).json({ message: error.message });
    })
}

const deleteMyAccommodation = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;
  Accommodations.deleteMyAccommodationById(hostId, accommodationId)
    .then(response => {
      if (response) {
        return res.status(204).json();
      } else {
        return res.status(404).json({ message: `The accommodation with id: ${accommodationId} doesn't exist` })
      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

const editMyAccommodation = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;
  const data = req.body;

  const { id, userId, score, placeId, ...restOfData } = data;

  if (!Object.keys(restOfData).length)
    return res.status(400).json({ message: 'Missing data' });

  Accommodations.editMyAccommodationById(hostId, accommodationId, restOfData)
    .then(response => {
      console.log({ response });
      if (response[0]) {
        return res.status(200).json({ message: `Accommodation with id:${accommodationId} edited succesfully` })
      } else {
        return res.status(404).json({ message: `The accommodation with id:${accommodationId} doesn't exist` })

      }
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })

    })
}

//Get all accommodations as Admin of any host
const getAccommodationsByHostId = (req, res) => {
  const data = req.body;
  const hostId = data.hostId

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!hostId) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        hostId: 'Type an hostId',
      }
    })
  }

  Accommodations.getMyAccommodationById(hostId)
    .then(response => {
      if (response)
        return res.status(200).json({ items: response.length, response })
      else
        return res.status(404).json({ message: `User with id:${hostId} doesn't exist` })
    })
    .catch(error => res.status(404).json({ message: error.message }))
}



module.exports = {
  getAll,
  getById,
  editAccomodation,
  remove,
  post,
  getMyAccommodations,
  getMyAccommodation,
  deleteMyAccommodation,
  editMyAccommodation,
  getAccommodationsByHostId
}