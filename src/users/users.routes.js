const router = require('express').Router();
//PARA PROTEGER LAS RUTAS
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');
const { usersMulter } = require('../utils/multer');
require('../middleware/auth.middleware')(passport);

const usersServices = require('./users.http');

router.route('/') //* /api/v1/users/
  .get(usersServices.getAll)


//TO DO GET Y DELETE
router.route('/me')
  .put(passport.authenticate('jwt', { session: false }), usersServices.editMyUser)
  .get(passport.authenticate('jwt', { session: false }), usersServices.getMyUser)
  .delete(passport.authenticate('jwt', { session: false }), usersServices.removeMyUser);

// router.route('/me/profile-img')
//   .post(passport.authenticate('jwt', { session: false }),usersMulter().single('profile_img'),usersServices.postProfileImg)
  // .get(passport.authenticate('jwt', { session: false }),);

router.route('/:id')
  .get(usersServices.getById)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, usersServices.remove)
  .put(passport.authenticate('jwt', { session: false }),usersServices.edit);

router.route('/:id/role')
  .get(usersServices.getUserRole);

exports.router = router;
