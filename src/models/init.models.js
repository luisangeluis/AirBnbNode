const Users = require('./user.model');
const Roles =require('./roles.model')
const Accommodations = require('./accommodations.model');
const Reservations = require('./reservations.model');
const Places = require('./places.model');
const UsersImages = require('./usersImages.model');
const AccommodationsImages = require('./accommodationsImages.model');

const initModels=()=>{
  //? Users<-Roles
  Roles.hasMany(Users);
  Users.belongsTo(Roles);
  
  //Users->UsersImages
  Users.hasMany(UsersImages);
  UsersImages.belongsTo(Users);

  //Users->Accommodations
  Users.hasMany(Accommodations);
  Accommodations.belongsTo(Users);

  // Users<->Accommodations
  // Users.belongsToMany(Accommodations, { through: Reservations });
  // Accommodations.belongsToMany(Users, { through: Reservations });
  

  Users.hasMany(Reservations)
  Reservations.belongsTo(Users)

  Accommodations.hasMany(Reservations)
  Reservations.belongsTo(Accommodations)

  

  //Accommodations<-Places
  Places.hasMany(Accommodations);
  Accommodations.belongsTo(Places);

  //Accommodations->AccommodationsImages
  Accommodations.hasMany(AccommodationsImages);
  AccommodationsImages.belongsTo(Accommodations);
}

module.exports=initModels;