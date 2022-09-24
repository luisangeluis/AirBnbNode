const Role = require("../models/roles.model");

const roleAdminMiddleware = (req, res, next) => {

  Role.findOne({ where: { name: "admin", } })
    .then((response) => { //? select * from roles where name = 'admin'
      const roleId = req.user.roleId;
     
      if (roleId === response.id) {
        next();
      } else {
        res.status(401).json({
          status: "error",
          message: "User not authorized to make this ",
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

const roleHostMiddleware = (req, res, next) => {
  Role.findOne({ where: { name: "host", } })
    .then((response) => { //? select * from roles where name = 'admin'
      const roleId = req.user.roleId;

      if (roleId === response.id) {
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