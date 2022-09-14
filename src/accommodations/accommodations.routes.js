const router = require('express').Router();
const passport = require('passport');

const accommodationsServices = require('./accommodations.http')
const reservationsServices = require('../reservations/reservations.http');

require('../middleware/auth.middleware')(passport);


router.route('/')
  .get(accommodationsServices.getAll);

router.route('/:id')
  .get(accommodationsServices.getById);

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt',{session:false}), reservationsServices.postReservation);

// router.route('/me')
//   .get()

exports.router = router;