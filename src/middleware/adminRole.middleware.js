const Role = require("../models/roles.model");


const roleAdminMiddleware = (req, res, next) => {

  Role.findOne({where: {name: "admin",}})
    .then((response) => { //? select * from roles where name = 'admin'
      const rol = req.user.rol;

      if (rol === response.id) {
        next();
      } else {
        res.status(401).json({
          status: "error",
          message: "User not authorized to make this request",
        });
      }

    })
    .catch(() =>
      res.status(401).json({
        status: "error",
        message: "User not authorized to make this request",
      })
    );
  // const rol = req.user.rol;

  // if (rol === 'admin') {
  //   next();
  // } else {
  //   res.status(401).json({ message: 'User not authorized to make this request' })
  // }
}

const roleHostMiddleware =()=>{
  Role.findOne({where: {name: "host",}})
    .then((response) => { //? select * from roles where name = 'admin'
      const rol = req.user.rol;

      if (rol === response.id) {
        next();
      } else {
        res.status(401).json({
          status: "error",
          message: "User not authorized to make this request",
        });
      }

    })
    .catch(() =>
      res.status(401).json({
        status: "error",
        message: "User not authorized to make this request",
      })
    );
}

module.exports = {
  roleAdminMiddleware,
  roleHostMiddleware
}