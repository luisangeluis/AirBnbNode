const Accommodations = require('./accommodations.controllers');

const getAll=(req, res)=>{
  Accommodations.getAllAccommodations()
    .then(response=>{
      return res.status(200).json({items:response.length,response});
    })
    .catch(error=>{
      return res.status(400).json(error);
    });
}

const getById =(req,res)=>{
  const id = req.params.id;
  Accommodations.getAccommodationById(id)
    .then(response=>{
      return res.status(200).json(response);
    })
    .catch(error=>{
      return res.status(404).json({message:`The user with id:${id} doesn't exist`});
    });
}

module.exports={
  getAll,
  getById
}