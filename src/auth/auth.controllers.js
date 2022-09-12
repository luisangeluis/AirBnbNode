const { getUserByEmail } = require('../users/users.controllers');
const { comparePassword } = require('../utils/crypt');
// const {} =require('');

const loginUser = async(email, password) => {

  return await getUserByEmail(email)
    .then(res => {
      const verifyPassword = comparePassword(password, res.password);
      if (verifyPassword)
        return user;

      return false;
    })
    .catch(errror => {
      return false;
    })
}

module.exports = {
  loginUser
}