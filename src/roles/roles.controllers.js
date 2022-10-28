const uuid = require('uuid');

const Roles = require('../models/roles.model');

const ReadAllRoles = async () => {
  const response = await Roles.findAll()
  return response;
}

const ReadRoleById = async (id) => {
  const response = await Roles.findOne({
    where: { id }
  })

  return response;
}

const createRole = async (data) => {
  const response = await Roles.create({
    ...data,
    id: uuid.v4()
  })

  return response;
}

const updateRole = async (roleId, data) => {
  const { id, ...restOfData } = data;

  const response = await Roles.update(
    restOfData,
    { where: { id:roleId } }
  )

  return response;
}

const deleteRole =async(id)=>{
  const response = await Roles.destroy({where:{id}})

  return response;
}

module.exports={
  ReadAllRoles,
  ReadRoleById,
  createRole,
  updateRole,
  deleteRole
}

