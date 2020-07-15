const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());

const toursFilePath = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilePath));

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

  if (!tour) {
    return res.status(404).json({
      status: 'failure',
      message: 'not-found',
    });
  }

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

  return res.status(404).json({
    status: 'failure',
    message: 'not-found',
  });
};

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id').get(getTourById).patch(updateTour);

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
