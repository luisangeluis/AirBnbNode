const router = require('express').Router();
const accommodationsServices = require('./accommodations.http')

router.route('/')
  .get(accommodationsServices.getAll);

router.route('/:id')
  .get(accommodationsServices.getById);

exports.router = router;