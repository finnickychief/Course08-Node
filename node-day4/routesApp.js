const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 4000;
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// /dan_abramov/status/1067875748378288128
app.get('/:username/status/:statusId', (req, res) => {
  let { username, statusId } = req.params;

  res.json({ username, statusId });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
