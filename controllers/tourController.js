const fs = require('fs');

const toursFilePath = `${__dirname}/../dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilePath));

const checkID = (_, res, next, idToFind) => {
  const tour = tours.find(({ id }) => id === Number(idToFind));

  if (!tour) {
    return res.status(404).json({
      status: 'failure',
      message: 'not-found',
    });
  }
  next();
};

const checkBody = (req, res, next) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({
      status: 'failure',
      message: 'Missing name or price',
    });
  }

  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTourById = (req, res) => {
  const { params } = req;
  const tour = tours.find(({ id }) => id === Number(params.id));

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

const createTour = (req, res) => {
  const { body } = req;
  const newId = tours[tours.length - 1].id + 1;
  const newTour = { id: newId, ...body };

  tours.push(newTour);
  fs.writeFile(toursFilePath, JSON.stringify(tours), () => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

const updateTour = (req, res) => {
  const { body } = req;
  const { params } = req;
  const tourIndex = tours.findIndex(({ id }) => id === Number(params.id));

  if (tourIndex >= 0) {
    const tour = { ...tours[tourIndex], ...body };

    tours[tourIndex] = tour;

    return fs.writeFile(toursFilePath, JSON.stringify(tours), () => {
      res.status(200).json({
        status: 'success',
        data: {
          tour,
        },
      });
    });
  }
};

module.exports = {
  checkID,
  checkBody,
  getAllTours,
  getTourById,
  createTour,
  updateTour,
};
