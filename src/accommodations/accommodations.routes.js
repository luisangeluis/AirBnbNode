const router = require('express').Router();
const passport = require('passport');

const { roleAdminMiddleware, roleHostMiddleware,roleGuestMiddleware } = require('../middleware/adminRole.middleware');
const { uploadAccomm } = require('../utils/multer')
// const { upload } = require('../utils/testMulter')


const accommodationsServices = require('./accommodations.http')
const reservationsServices = require('../reservations/reservations.http');
const accommodationsImages = require('../accommodationsImages/accommodationsImages.http');

require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(accommodationsServices.getAll)

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt', { session: false }),roleGuestMiddleware, reservationsServices.postReservation);

router.route('/my-accommodations')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.getMyAccommodations)
  .post(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.post)

router.route('/my-accommodations/:id')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.getMyAccommodation)
  .delete(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.deleteMyAccommodation)
  .put(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.editMyAccommodation)

router.route('/my-accommodations/:id/post-image')
  .post(passport.authenticate('jwt', { session: false }),
    roleHostMiddleware, uploadAccomm().single('accommodationimg'),
    accommodationsImages.sendImageMyAccommo)

router.route('/host-accommodations')
  .get(passport.authenticate('jwt', { session: false }), roleAdminMiddleware,accommodationsServices.getAccommodationsByHostId)

router.route('/:id')
  .get(accommodationsServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.editAccomodation)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.remove);


exports.router = router;