const AccommodationsImages = require('./accommodationsImages.controllers');

const sendImageMyAccommo = (req, res) => {
  const hostId = req.user.Id;
  const accommodationId = req.params.id;
  const imgUrl = req.hostname+':8000'+'api/v1/accommodations/my-accommodations/:id/post-image'+req.file.filename;
  const name = req.file.filename;
  const data = {name,accommodationId,imgUrl}

  AccommodationsImages.postImageMyAccommodationById(hostId, accommodationId,data)
    .then(response => {
      if (response)
        return res.status(201).json({ message: `Image sent successfully for Accommodation with id ${accommodationId}` })
      else
        return res.status(404).json({ message: `Accommodation with id ${accommodationId} doesn't exist` })
    })
    .catch(error => {
      return res.status(400).json({ message: error.message })
    })
}

module.exports = {
  sendImageMyAccommo
}