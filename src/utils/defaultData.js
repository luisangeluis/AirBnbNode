// const Accommodation_images = require("../models/accommodation_images.model");
// const Accommodations = require("../models/accommodations.model");
// const Places = require("../models/places.model");
// const Reservations = require("../models/reservations.model");
const Users = require("../models/user.model");
// const Users_images = require("../models/users_images.model");
const Roles = require("../models/roles.model");

const generateData = async () => {
  await Roles.bulkCreate([
    { name: "guest", id: "fef3a08d-2cec-4728-9745-7cbd2b37e557" },
    { name: "host", id: "97006fe0-4a35-47f4-bfbf-fc962e5fe500" },
    { name: "admin", id: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473" }
  ], { validate: true });

  await Users.create({
    id: "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    firstName: "Sahid",
    lastName: "Kick",
    gender: "male",
    email: "sahid.kick@academlo.com",
    password: "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    phone: "1234567890",
    birthdayDate: "2000/10/20",
    dni: "",
    address: "",
    roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
    profileImage: "asd.com",
    status: "active",
    verified: false
  });
}


module.exports = generateData