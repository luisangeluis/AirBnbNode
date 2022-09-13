const reservationsControllers = require('./reservations.controllers');

const postReservation=(req,res)=>{
  const accommodationId = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  reservationsControllers.createReservation(userId,accommodationId,data)
    .then(response=>{
      res.status(201).json(response)
    })
    .catch(error=>{
      res.status(400).json({status: 400, message: error.message})
    });

}

module.exports={
  postReservation
}