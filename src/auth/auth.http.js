const jwt = require('jsonwebtoken');

const { loginUser } = require('./auth.controllers');

const login = (req, res) => {
  const data = req.body;

  if (!data.email || !data.password) {
    return res.status(400).json({ message: 'Missing data' });
  }

  loginUser(data.email, data.password)
    .then(response => {
      if (response) {
        const token = jwt.sign({
          id: response.id,
          email: response.email,
          roleId: response.roleId
        }, 'academlo');

        return res.status(200).json({ message: 'Tus credenciales son correctas', token: token });
      } else {
        return res.status(401).json({ message: "Invalid Credentials" });
      }


    })
    .catch(error => {
      return res.status(401).json({ message: 'Invalid credentials' });
    });
}

module.exports = {
  login
}