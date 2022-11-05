//Dependencies
const uuid = require('uuid');
//Models
const Places = require('../models/places.model');

const readAllPlaces = async () => {
  const response = await Places.findAll();

  return response;
}

const readPlaceById = async (id) => {
  const response = await Places.findOne({ where: { id } });

  return response;
}

const createPlace = async (data) => {
  const response = await Places.create({
    ...data,
    id: uuid.v4()
  })

  return response;
}

const updatePlace = async (placeId, data) => {
  const { id,isActive, ...restOfData } = data;

  const response = await Places.update(
    { ...restOfData },
    { where: { id: placeId } }
  )

  return response;
}

//change the status of the place.
const updateIsActive = async(placeId) => {
  const response = await Places.update(
    { isActive: !isActive },
    { where: { id: placeId } }
  )

  return response;
}

modulo.exports={
  readAllPlaces,
  readPlaceById,
  createPlace,
  updatePlace,
  updateIsActive
}

