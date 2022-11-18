const Reservation =require('../../models/reservations.model');
const Accommodations =require('../../models/accommodations.model');

const reservationAsHostExistMiddleware=(req,res,next)=>{
  const hostId = req.user.id;
  const reservationId = req.params.reservationId;
  Reservation.findOne({
    where:{id:reservationId},
    include:{
      model: Accommodations,
      where:{userId:hostId}
    }
  })
  .then(response=>{
    console.log({response});
  })
  .catch(error=>{
    console.log(error.message);
  })
}

module.exports={
  reservationAsHostExistMiddleware
}