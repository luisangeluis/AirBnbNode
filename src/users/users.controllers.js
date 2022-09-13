const uuid = require('uuid');
const { hashPassword } = require('../utils/crypt');
const Users = require('../models/user.model');
const Roles = require('../models/roles.model');
const { response } = require('express');

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
const createUser = async (data) => {
  const newUser = await Users.create({
    ...data,
    id: uuid.v4(),
    password: hashPassword(data.password),
    //TODO OBTENER EL ROLE GUEST CUANDO PUEDA OBTENER LOS ROLES
    roleId: 'fef3a08d-2cec-4728-9745-7cbd2b37e557',
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

const editUser = async (userId, data, userRole) => {
  const { id, password, verified, roleId, ...restOfProperties } = data;

  if ('5ee551ed-7bf4-44b0-aeb5-daaa824b9473' === userRole) {
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
  const response = await Users.findOne({
     where: { email },
     attributes:{
      exclude:['createdAt','updatedAt','roleId']
     }
  });
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

const getUserWithRole = async (userId) => {
  const data = await Users.findOne({
    where: {
      id: userId
    },
    attributes: {
      exclude: ['password', 'createdAt', 'updatedAt']
    },
    include:
    {
      model: Roles,
      attributes: {
        exclude: ['id', 'createdAt', 'updatedAt', 'password']
      }
    }
  })

  return data;
}

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg,
  getUserWithRole
}
