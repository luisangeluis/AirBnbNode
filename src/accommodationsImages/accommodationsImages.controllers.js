const uuid = require('uuid');

const Accommodations = require('../models/accommodations.model');
const AccommodationsImages = require('../models/accommodationsImages.model')

const postImageMyAccommodationById = async (hostId, accommodationId, data) => {

  //Personalizar los multers para cargar los archivos segun las necesidades del controller
  try {
    const accommodation = await Accommodations.findOne({ where: { id: accommodationId, hostId } })

    if (accommodation) {
      const response = await AccommodationsImages.create({
        ...data,
        id: uuid.v4()
      })

      return response;
    }
  } catch (error) {
    return error.message
  }
}

module.exports = {
  postImageMyAccommodationById
}