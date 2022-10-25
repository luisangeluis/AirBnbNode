// const Accommodation_images = require("../models/accommodation_images.model");
const Accommodations = require("../models/accommodations.model");
const Places = require("../models/places.model");
const Reservations = require("../models/reservations.model");
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
    password: "$2b$10$zrPhM0AoedA1RJg3C0fL7uWg8Qf/9aoCfwKknQKulg5Iz3tiJKIHK",
    phone: "1234567890",
    birthdayDate: "2000/10/20",
    dni: "",
    address: "",
    roleId: "5ee551ed-7bf4-44b0-aeb5-daaa824b9473",
    profileImage: "asd.com",
    status: "active",
    verified: false
  });

  await Users.create({
    id: "3bd244ca-7a80-4f1f-9732-019871f53a54",
    firstName: "Luis",
    lastName: "Zepeda",
    gender: "male",
    email: "luis@academlo.com",
    password: "$2b$10$zrPhM0AoedA1RJg3C0fL7uWg8Qf/9aoCfwKknQKulg5Iz3tiJKIHK",
    phone: "1234567890",
    birthdayDate: "2000/10/20",
    dni: "",
    address: "",
    roleId: "97006fe0-4a35-47f4-bfbf-fc962e5fe500",
    profileImage: "asd.com",
    status: "active",
    verified: false
  });

  await Users.create({
    id: "ed7c09e4-84a1-45da-8097-387f6bd6f0ca",
    firstName: "angel",
    lastName: "gonzalez",
    gender: "male",
    email: "angel@academlo.com",
    password: "$2b$10$zrPhM0AoedA1RJg3C0fL7uWg8Qf/9aoCfwKknQKulg5Iz3tiJKIHK",
    phone: "1234567890",
    birthdayDate: "2000/10/20",
    dni: "",
    address: "",
    roleId: "97006fe0-4a35-47f4-bfbf-fc962e5fe500",
    profileImage: "asd.com",
    status: "active",
    verified: false
  });

  await Users.create({
    id: "e1edcbf9-acdf-48d6-9ffa-995dd2b52eee",
    firstName: "pedro",
    lastName: "perez",
    gender: "male",
    email: "pedro@academlo.com",
    password: "$2b$10$zrPhM0AoedA1RJg3C0fL7uWg8Qf/9aoCfwKknQKulg5Iz3tiJKIHK",
    phone: "1234567890",
    birthdayDate: "2000/10/20",
    dni: "",
    address: "",
    roleId: "fef3a08d-2cec-4728-9745-7cbd2b37e557",
    profileImage: "asd.com",
    status: "active",
    verified: false
  });

  await Places.bulkCreate([
    {
      id: '864ee3c2-facd-4a23-8b4a-4e9d342d9036',
      city: 'Guadalajara',
      state: 'Jalisco',
      country: 'México',
      continent: 'America'
    },
    {
      id: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
      city: 'Zapopan',
      state: 'Jalisco',
      country: 'México',
      continent: 'America'
    },
    {
      id: '3436a556-6623-40ba-88b8-2e01009f9d82',
      city: 'Suba',
      state: 'Bogotá',
      country: 'Colombia',
      continent: 'America'
    },
    {
      id: '134a55b6-487c-46cc-a5b5-9392af20c205',
      city: 'Medellín',
      state: 'Antioquia',
      country: 'Colombia',
      continent: 'America'
    },
    {
      id: '3a230417-80ae-4232-a8ff-6fd50068a777',
      city: 'Azcapotzalco',
      state: 'CDMX',
      country: 'México',
      continent: 'America'
    },
    {
      id: '0d907427-7623-4ec9-8c6d-270bb92fbbe7',
      city: 'Monterrey',
      state: 'Muevo León',
      country: 'México',
      continent: 'America'
    },
  ])

  await Accommodations.create({
    id: "7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    title: "propiedad de luis",
    description: "asd",
    guests: 6,
    rooms: 3,
    beds: 3,
    bathrooms: 4.5,
    price: 1536.00,
    hostId: '3bd244ca-7a80-4f1f-9732-019871f53a54',
    score: 0.00,
    placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
    commision: 150.00
  })

  await Accommodations.create({
    id: "b784d7f8-10a2-4542-bb4e-d2c88f2db3b3",
    title: "accommo propiedad de sahid",
    description: "asd",
    guests: 6,
    rooms: 3,
    beds: 3,
    bathrooms: 4.5,
    price: 1536.00,
    hostId: '74cd6011-7e76-4d6d-b25b-1d6e4182ec2f',
    score: 0.00,
    placeId: '9c0412b6-7d56-4347-8fbe-5455e8a42438',
    commision: 150.00
  })

  await Reservations.create({
    id:"0ef06465-3035-402f-b77b-d7f5d2a67fbe",
    userId:"74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    arrival:"2020/10/10",
    departure:"2020/10/10",
    accommodationId:"7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    adults:2
  })

  await Reservations.create({
    id:"bf0e8e8c-6af8-44dd-b1ab-b365a713bb2b",
    userId:"3bd244ca-7a80-4f1f-9732-019871f53a54",
    arrival:"2020/10/10",
    departure:"2020/10/10",
    accommodationId:"7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    adults:2
  })

  await Reservations.create({
    id:"175859ed-9a4b-4dfa-8c10-714346d18531",
    userId:"74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    arrival:"2020/10/10",
    departure:"2020/10/10",
    accommodationId:"7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
    adults:2
  })

  await Reservations.create({
    id:"b784d7f8-10a2-4542-bb4e-d2c88f2db3b3",
    userId:"74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    arrival:"2020/10/10",
    departure:"2020/10/10",
    accommodationId:"b784d7f8-10a2-4542-bb4e-d2c88f2db3b3",
    adults:2
  })

  // await Reservations.create({
  //   id:"e0950302-8b09-4899-95a3-109c91e19454",
  //   userId:"74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
  //   arrival:"2020/10/10",
  //   departure:"2020/10/10",
  //   accommodationId:"7e5fc196-8f45-46d2-bb2b-2f8b95340d50",
  //   adults:2
  // })


  
}


module.exports = generateData