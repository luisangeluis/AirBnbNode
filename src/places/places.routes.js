//Depedencies
const router = require('express').Router();
const passport = require('passport');
//Middlewares.
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');
const { placeExistMiddleware } = require('../middleware/places/placeExist.middleware')
//Services
const placesServices = require('./places.http');
//passport's configuration
require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.getAll)
  .post(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.post)

router.route('/:id')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placesServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, placeExistMiddleware, placesServices.edit)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware,placesServices.remove)
exports.router = router;




