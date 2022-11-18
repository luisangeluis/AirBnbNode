const router = require('express').Router();
const passport = require('passport');
//Middlewares
const { roleAdminMiddleware, roleHostMiddleware } = require('../middleware/adminRole.middleware');
const { reservationExistMiddleware } = require('../middleware/reservations/reservationExist.middleware');
const {reservationAsHostExistMiddleware} =require('../middleware/reservations/reservationAsHost.middleware');
//Services
const reservationsServices = require('./reservations.http');

require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getAll);

router.route('/my-reservations')
  .get(passport.authenticate('jwt', { session: false }), reservationsServices.getAllMyReservations)

router.route('/my-reservations/:id')
  .get(passport.authenticate('jwt', { session: false }), reservationsServices.getById)

//Guest give a score with finished reservation.
router.route('/my-reservations/:id/score')
  .patch(passport.authenticate('jwt', { session: false }), reservationExistMiddleware,
    reservationsServices.giveAScore)

router.route('/my-reservations_as-host')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware,
    reservationsServices.getAllHostReservations)

router.route('/my-reservations_as-host/:reservationId/cancel')
  .patch(passport.authenticate('jwt', { session: false }), roleHostMiddleware,
    reservationAsHostExistMiddleware, reservationsServices.cancelAsHost)

router.route('/my-reservations_as-host/:reservationId')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, reservationsServices.getHostReservationById)

router.route('/:reservationId')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, reservationsServices.getById)

module.exports = {
  router
}