const uuid = require('uuid');

const Accommodations = require('../models/accommodations.model');
const AccommodationsImages = require('../models/accommodationsImages.model')

const postImageMyAccommodationById = async (userId, accommodationId, data) => {

  //TODO Personalizar los multers para cargar los archivos segun las necesidades del controller
  try {
    const accommodation = await Accommodations.findOne({ where: { id: accommodationId, userId } })
    if (accommodation) {
      const response = await AccommodationsImages.create({
        ...data,
        accommodationId,
        id: uuid.v4()
      })

      return response;
    }
  } catch (error) {
    return error.message
  }
}

const postImagesToMyAccomm = async (userId, accommodationId, arrayOfData) => {
  try {
    const accommodation = await Accommodations.findOne({ where: { id: accommodationId, userId } })
    if (accommodation) {
      arrayOfData.forEach(element => {
        element.id = uuid.v4();
        element.accommodationId = accommodationId;
      });
      console.log(arrayOfData);
      const response = await AccommodationsImages.bulkCreate(arrayOfData);
      return response;
    }
  } catch (error) {
    return error.message;
  }
}

const readImagesOfAccomm = async (accommodationId) => {
  const response = await AccommodationsImages.findAll({ where: { accommodationId } });
  return response;
}
const readImageOfAccomm = async (fileName) => {
  const response = await AccommodationsImages.findOne({ where: { name: fileName } })
  return response;
}

module.exports = {
  postImageMyAccommodationById,
  postImagesToMyAccomm,
  readImagesOfAccomm,
  readImageOfAccomm
}