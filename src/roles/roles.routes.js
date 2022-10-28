const router = require('express').Router();
const passport = require('passport');
const rolesServices = require('./roles.http')
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');


require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, rolesServices.getAll)
  .post(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, rolesServices.post)

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, rolesServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, rolesServices.edit)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, rolesServices.remove)

exports.router = router;
