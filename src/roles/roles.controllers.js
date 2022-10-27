const uuid = require('uuid');

const Roles = require('../models/roles.model');

const ReadAllRoles = async () => {
  const data = await Roles.findAll()
  return data;
}

const ReadRoleById = async (id) => {
  const data = await Roles.findOne({
    where: { id }
  })

  return data;
}

const createRole = async (data) => {
  const data = await Roles.create({
    ...data,
    id: uuid.v4()
  })

  return data;
}

const updateRole = async (id, data) => {
  const { id, ...restOfData } = data;

  const data = await Roles.update(
    restOfData,
    { where: { id } }
  )

  return data;
}

const deleteRole =async(id)=>{
  const data = await Roles.destroy({where:{id}})

  return data;
}

module.exports={
  ReadAllRoles,
  ReadRoleById,
  createRole,
  updateRole,
  deleteRole
}

