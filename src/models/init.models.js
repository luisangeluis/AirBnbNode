const Users = require('./user.model');
const Roles =require('./roles.model')
const initModels=()=>{
  //? Users<-Roles
  Roles.hasMany(Users);
  Users.belongsTo(Roles);

  //? Users<->Accommodations
  Users.belongsToMany(Accommodations, { through: Reservations });
  Accommodations.belongsToMany(Users, { through: Reservations });
}

module.exports=initModels;