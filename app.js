const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

const toursFilePath = `${__dirname}/dev-data/data/tours-simple.json`;
const tours = JSON.parse(fs.readFileSync(toursFilePath));

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

const port = 3000;
app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});
