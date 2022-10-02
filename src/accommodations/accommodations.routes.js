const router = require('express').Router();
const passport = require('passport');

const { roleAdminMiddleware, roleHostMiddleware } = require('../middleware/adminRole.middleware');
const { upload } = require('../utils/multer');


const accommodationsServices = require('./accommodations.http')
const reservationsServices = require('../reservations/reservations.http');
const accommodationsImages = require('../accommodationsImages/accommodationsImages.http');

require('../middleware/auth.middleware')(passport);

router.route('/')
  .get(accommodationsServices.getAll);

router.route('/:id/make-reservation')
  .post(passport.authenticate('jwt', { session: false }), reservationsServices.postReservation);

router.route('/my-accommodations')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.getMyAccommodations)

router.route('/my-accommodations/:id')
  .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.getMyAccommodation)
  .delete(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.deleteMyAccommodation)
  .put(passport.authenticate('jwt', { session: false }), roleHostMiddleware, accommodationsServices.editMyAccommodation)

//Reservation Host  
// router.route('/my-accommodations/:id/host-reservations')
//   .get(passport.authenticate('jwt', { session: false }), roleHostMiddleware,reservationsServices.getHostReservations)

router.route('/my-accommodations/:id/post-image')
  .put(passport.authenticate('jwt', { session: false }), roleHostMiddleware, upload.single('accommodation_img'),
    accommodationsImages.sendImageMyAccommo)

router.route('/:id')
  .get(accommodationsServices.getById)
  .put(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.editAccomodation)
  .delete(passport.authenticate('jwt', { session: false }), roleAdminMiddleware, accommodationsServices.remove);


exports.router = router;