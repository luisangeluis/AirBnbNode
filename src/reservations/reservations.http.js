const reservationsControllers = require('./reservations.controllers');

const getAll=(req,res)=>{
  reservationsControllers.getAllReservations()
    .then(response=>{
      res.status(200).json({items:response.length,items:response})
    })
    .catch(error=>{
      res.status(400).json({error})
    })
}

const postReservation=(req,res)=>{
  const accommodationId = req.params.id;
  const userId = req.user.id; 
  const data = req.body;

  // console.log('userId',userId);
  console.log('accommodationId', accommodationId);
  reservationsControllers.createReservation(userId,accommodationId,data)
    .then(response=>{
      res.status(201).json(response)
    })
    .catch(error=>{
      res.status(400).json({status: 400, message: error.message})
    });

}

module.exports={
  postReservation,
  getAll
}