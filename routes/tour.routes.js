const express = require('express');
const {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getAllTours).post(createTour);
router.route('/:id').get(getTourById).patch(updateTour);

module.exports = router;
