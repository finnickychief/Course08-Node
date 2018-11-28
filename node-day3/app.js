const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 4000;
// Declare the new application: app is now our server
const app = express();

const authors = {
  stephenKing: ['It', 'The Shining', 'Carrie'],
  neilGaiman: ['American Gods', 'Coraline', 'Good Omens'],
  williamShakespeare: ['Romeo & Juliet', 'Othello', 'Tempest', 'Hamlet']
};

// Create a path that lists an authors books when you go to their 'profile' page

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
  console.log(req.params.param); // The param is not parsed until we get to the route that uses them
  console.log('In second middleware, body is : ' + req.body);
  next();
});
// app.use(bodyParser.json()); // If we put our bodyParser here instead, it is not available in our second middleware because it runs afterwards

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Step 1: Make sure you can get the correct book list off the URL
// Step 2: Render a page with the unformatted book list
// Step 3: Render a page with the book list as an HTML list
// Use this route: /author/:authorName
// postman url will look like /author/stephenKing

app.get('/author/:authorName', (req, res) => {
  let authorName = req.params.authorName;
  let books = authors[authorName]; // Grab the books for the authorName we take in

  if (books) {
    let obj = { author: authorName, books: books };
    // If books exists, render the template for the author
    res.render('bookList', obj);
  } else {
    // If books does not exist, render 404
    res.status(404).render('error', { name: 'Jeff' });
  }
});

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
    res.status(400).json({
      error: 'Bad search query'
    });
  }
});

app.get('/slug/:param/:param2', (req, res) => {
  // let param = req.params.param; // param comes from the slug in the url. req.params holds all params within the url
  // let param2 = req.params.param2;
  // console.log(req.params);

  let { param, param2 } = req.params;

  let obj = {
    param1: param,
    param2: param2
  };

  res.json(obj);
});

// * will hit for ANY url, and is a way to handle invalid paths easily
app.use('*', (req, res) => {
  res.status(404).render('error', { name: 'Jeff' });
});

// Make our server listen on a port
app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
