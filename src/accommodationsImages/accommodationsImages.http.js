const AccommodationsImages = require('./accommodationsImages.controllers');

const sendImageMyAccommo = (req, res) => {
  const hostId = req.user.id;
  const accommodationId = req.params.id;
  const file = req.file;

  if (!file) return res.status(400).json({ message: 'Attach image' })

  const url =req.hostname + ':3000' + '/api/v1/imgsaccomm/' + req.file.filename;
  // const url =`HLLA://foo.com`;
  // const url = 'foo.com' 
  console.log({req});
  const name = req.file.filename;
  const data = {name,url}
  // console.log({ file });
  console.log({ url });
  // hostId,name de archivo,accommodationId,url

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

const sendImagesToAccomm=(req,res)=>{
  // console.log(req.files);
  const hostId =req.user.id;
  const accommId = req.params.id;
  const urls =[];
  const files = req.files;

  if (!files) return res.status(400).json({ message: 'Attach images' })
  
  files.forEach(file => {
    // console.log(file);
    // const url = req.hostname + ':3000' + '/api/v1/imgsaccomm/' + file.filename;
    // urls.push(url);
    const url ={name:file.filename,url:req.hostname + ':3000' + '/api/v1/imgsaccomm/' + file.filename}
    urls.push(url);
  });
  // console.log(urls);

  AccommodationsImages.postImagesToMyAccomm(hostId,accommId,urls)
    .then(response=>{
      console.log({response});
    })
    .catch(error=> res.status(400).json({message:error.message}))


}

module.exports = {
  sendImageMyAccommo,
  sendImagesToAccomm
}