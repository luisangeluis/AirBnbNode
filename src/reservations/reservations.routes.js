const router = require('express').Router();
const reservationsServices = require('./reservations.http');
//Pasport
const passport = require('passport');
const { roleAdminMiddleware } = require('../middleware/adminRole.middleware');

require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getAll);

router.route('/my-reservations')
  .get(passport.authenticate('jwt', { session: false }), reservationsServices.getAllMyReservations)

router.route('/my-reservations/:id')
  .get(passport.authenticate('jwt', { session: false }),)

router.route('/:reservationId')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getById)

module.exports = {
  router
}