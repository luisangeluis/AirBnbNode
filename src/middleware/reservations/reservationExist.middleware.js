const Reservation = require('../../models/reservations.model');

const reservationExistMiddleware=(req,res,next)=>{
  const userId = req.user.id;
  const reservationId = req.params.id;
  
  Reservation.findOne({
    where:{
      id:reservationId,
      userId
    }
  })
  .then(response=>{
    console.log(response);
    if(response)
      next();
    else
      return res.status(404).json({message:`Reservation with id:${reservationId} doesn't exist`})
  })
  .catch(error=>res.status(400).json({message:error.message}))
}

module.exports={
  reservationExistMiddleware
}