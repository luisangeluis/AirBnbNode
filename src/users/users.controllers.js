const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');
const Users = require('../models/user.model');
const { response } = require('express');

const userDB = [
  {
    "id": "d9dbc589-36ff-4773-a77f-f0112834d7f4",
    "first_name": "luis",
    "last_name": "zepeda",
    "email": "luis@correo.com",
    "password": "$2b$10$ZPDohrvpVF6DE1HIYd4yTO/gmZkvD4/b50hPqOGdhNZ7WNJWioFd6",
    "phone": "1234567890",
    "birthday_date": "22/10/2000",
    "rol": "normal",
    "profile_image": "localhost:3000/api/v1/uploads1661728653826-proyecto.png",
    "active": true,
    "verified": false
  },
  {
    "id": "8dd772dc-8da0-45f9-9766-5ab6651dd0c7",
    "first_name": "user2",
    "last_name": "user2",
    "email": "user2@example.com",
    "password": "$2b$10$7zHY4DSRvc49KKV.Uk015OdVZd.P6SRYgL25qBqwSxI3evVpI/b6C",
    "phone": "",
    "birthday_date": "10/10/2000",
    "rol": "admin",
    "profile_image": "",
    "active": true,
    "verified": false
  }
];

const getAllUsers = async () => {

  const data = await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  });
  return data;

}

const getUserById = async (id) => {

  const data = await Users.findOne({
    where: {
      id: id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data;

}
// TODO REVISAR EL HTTP de register
const createUser = async (data) => {

  const newUser = await Users.create({
    ...data,
    id: uuid.v4(),
    password: hashPassword(data.password),
    role: 'uuid',
    status: 'active',
    verified: false,
  })
  // const newUser = await Users.create({
  //   id: uuid.v4(),
  //   firstName: data.firstName,
  //   lastName: data.lastName,
  //   email: data.email,
  //   password: hashPassword(data.password),
  //   phone: data.phone,
  //   birthdayDate: data.birthdayDate,
  //   role: 'normal',
  //   profileImage: data.profileImage,
  //   country: data.country,
  //   status:'active',
  //   verified: false,
  //   gender:data.gender
  // })

  return newUser;

}

const editUser = async (userId, data, userRol) => {
  const { id, password, verified, roleId, ...restOfProperties } = data;
  if ('5ee551ed-7bf4-44b0-aeb5-daaa824b9473' === userRol) {
    const response = await Users.update({ ...restOfProperties, roleId }, { where: { id: userId } });
    return response;
  } else {
    const response = await Users.update(restOfProperties, { where: { id: userId } });
    return response;
  }
}

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id: id
    }
  })

  return data;

}

const getUserByEmail = async (email) => {
  const response = await Users.findOne({where: {email}});
  return response;
  
}

const editProfileImg = async (userId, imgUrl) => {

  const response = await Users.update({
    profileImage: imgUrl
  }, {
    where: {
      id: userId
    }
  })

  return response;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}
