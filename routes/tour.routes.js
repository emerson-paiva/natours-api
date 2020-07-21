const express = require('express');
const {
  checkID,
  checkBody,
  getAllTours,
  getTourById,
  createTour,
  updateTour,
} = require('../controllers/tourController');

const router = express.Router();

router.param('id', checkID);

router.route('/').get(getAllTours).post(checkBody, createTour);
router.route('/:id').get(getTourById).patch(updateTour);

module.exports = router;
