const router = require('express').Router();
const passport = require('passport');

const { roleAdminMiddleware, roleHostMiddleware } = require('../middleware/adminRole.middleware');


const accommodationsServices = require('./accommodations.http')
const reservationsServices = require('../reservations/reservations.http');

require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(accommodationsServices.getAll);

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt', { session: false }), reservationsServices.postReservation);

router.route('/my-accommodations')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.getMyAccommodations)

router.route('/my-accommodations/:id')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware,accommodationsServices.getMyAccommodation)
  .delete(passport.authenticate('jwt', { session: false }), roleHostMiddleware,accommodationsServices.remove)
  .put(passport.authenticate('jwt', { session: false }), roleHostMiddleware,accommodationsServices.editAccomodation)

router.route('/:id')
  .get(accommodationsServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.editAccomodation)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.remove);


exports.router = router;