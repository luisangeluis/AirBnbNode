const AccommodationsImages = require('./accommodationsImages.controllers');

const sendImageMyAccommo = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;
  
  const url = req.hostname + ':3000' + '/api/v1/imgsaccomm/' + req.file.filename;
  // const url = 'https://foo.com';
  const name = req.file.originalname
  const data = {name,accommodationId,url}
  console.log('req.file',req.file);
  AccommodationsImages.postImageMyAccommodationById(hostId, accommodationId,data)
    .then(response => {
      console.log('mi response',response);
      if (response)
        return res.status(201).json({ message: `Image sent successfully for Accommodation with id ${accommodationId}` })
      else
        return res.status(404).json({ message: `Accommodation with id ${accommodationId} doesn't exist` })
    })
    .catch(error => {
      return res.status(400).json({ error })
    })
}

module.exports = {
  sendImageMyAccommo
}