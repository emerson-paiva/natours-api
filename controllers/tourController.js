const Tour = require('../models/tourModel');

const getAllTours = async (req, res) => {
  try {
    const queryParams = { ...req.query };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryParams[el]);

    let queryStr = JSON.stringify(queryParams);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    const tours = await query;

    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
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
    res.status(404).json({
      status: 'fail',
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
    const tour = await Tour.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failure',
      message: error,
    });
  }
};

const deleteTour = async ({ params }, res) => {
  try {
    const { id } = params;
    await Tour.findByIdAndDelete(id);

    res.status(200).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
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
  deleteTour,
};
