const rolesControllers = require('./\/roles.controllers');

const getAll = (req, res) => {
  rolesControllers.ReadAllRoles()
    .then(response => res.status(200).json({ items: response.length, response }))
    .catch(error => res.status(400).json({ message: error.message }))
}

const getById = (req, res) => {
  const id = req.params.id;

  rolesControllers.ReadRoleById(id)
    .then(response => {
      if (response)
        return res.status(200).json(response)
      else
        return res.status(404).json({ message: `Role with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const post = (req, res) => {
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  if (!data.name) {
    return res.status(400).json({
      message: 'All fields must be completed',
      fields: {
        name: 'Type a name for the role'
      }
    })
  }

  rolesControllers.createRole(data)
    .then(response => res.status(201).json({ message: 'Role created successfully', response }))
    .catch(error => res.status(400).json({ message: error.message }))
}

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  if (!Object.keys(data).length) {
    return res.status(400).json({ message: 'Missing data' });
  }

  rolesControllers.updateRole(id, data)
    .then(response => {
      if (response)
        return res.status(200).json({ message: `Role with id:${id} edited successfully` })
      else
        return res.status(401).json({ message: `The role with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

const remove = (req, res) => {
  const id = req.params.id;

  rolesControllers.deleteRole(id)
    .then(response => {
      if (response)
        return res.status(204).json()
      else
        return res.status(404).json({ message: `The role with id:${id} doesn't exist` })
    })
    .catch(error => res.status(400).json({ message: error.message }))
}

module.exports={
  getAll,
  getById,
  post,
  edit,
  remove
}

