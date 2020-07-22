const Tour = require('../models/tourModel');

const getAllTours = async (_, res) => {
  try {
    const tours = await Tour.find();

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};

const getTourById = async ({ params }, res) => {
  try {
    const { id } = params;
    const tour = await Tour.findById(id);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'failure',
      message: error,
    });
  }
};

const createTour = async ({ body }, res) => {
  try {
    const newTour = await Tour.create(body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error,
    });
  }
};

const updateTour = async ({ params, body }, res) => {
  try {
    const { id } = params;
    const tour = await Tour.findByIdAndUpdate(id, body);

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failure',
      message: error,
    });
  }
};

module.exports = {
  getAllTours,
  getTourById,
  createTour,
  updateTour,
};
