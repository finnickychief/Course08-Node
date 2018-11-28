const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 4000;
// Declare the new application: app is now our server
const app = express();

app.use(morgan('dev'));

// Tell bodyParser to treat incoming data as json
app.use(bodyParser.json());

// This will apply a middleware that runs no matter what
// When we provide 2 arguments(route and callback) it only happens on that specific route
// When we provide only 1 argument(callback) it will be applied to ALL routes
// The third parameter, next, is a reference to the next piece of middleware to run and express handles this for you
app.use((req, res, next) => {
  console.log(
    'We are in the first piece of middleware, and the method is ' + req.method
  );
  next(); // Run the next piece of middleware
});

app.use((req, res, next) => {
  console.log('In second middleware, body is : ' + req.body);
  next();
});
// app.use(bodyParser.json()); // If we put our bodyParser here instead, it is not available in our second middleware because it runs afterwards

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World from GET on root path');
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('Hello world from POST on root path');
});

app.get('/search', (req, res) => {
  const name = req.query.name;
  const role = req.query.role;

  if (name) {
    res.json({
      name
    });
  } else if (role) {
    res.json({
      role
    });
  } else {
    res.send('No query provided');
  }
});

// * will hit for ANY url, and is a way to handle invalid paths easily
app.use('*', (req, res) => {
  res.render('error', { name: 'Jeff' });
});

// Make our server listen on a port
app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
