const uuid = require('uuid');

const Accommodations = require('../models/accommodations.model');
const AccommodationsImages = require('../models/accommodationsImages.model')

const postImageMyAccommodationById = async (hostId, accommodationId, data) => {

  //TODO Personalizar los multers para cargar los archivos segun las necesidades del controller
  try {
    console.log('info de data',data);
    console.log('data url',data.url);
    const accommodation = await Accommodations.findOne({ where: { id: accommodationId, hostId } })
    console.log('accomm buscado',accommodation);
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