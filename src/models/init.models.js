const Users = require('./user.model');
const Roles =require('./roles.model')
const initModels=()=>{
  //? Users<-Roles
  Users.belongsTo(Roles);
  Roles.hasMany(Users);

  

  //? Users<->Accommodations
  Users.belongsToMany(Accommodations, { through: Reservations });
  Accommodations.belongsToMany(Users, { through: Reservations });
}

module.exports=initModels;