const router = require('express').Router();
const passport = require('passport');

const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');


const accommodationsServices = require('./accommodations.http')
const reservationsServices = require('../reservations/reservations.http');

require('../middleware/auth.middleware')(passport);


router.route('/')
  .get(accommodationsServices.getAll);

router.route('/:id')
  .get(accommodationsServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.editAccomodation)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.remove);

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt', { session: false }), reservationsServices.postReservation);

// router.route('/me')
//   .get()

exports.router = router;