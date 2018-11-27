const express = require('express');
const path = require('path');

const port = 4000;
// Declare the new application: app is now our server
const app = express();

// Make sure ejs is installed: npm install ejs
// Set the folder to find views to be 'views' in the local directory
app.set('views', path.join(__dirname, 'views'));
// Set the templating/view engine to be EJS for this application
app.set('view engine', 'ejs');

// To attach a route to the application, use the name of the method you want to handle along with the route, and a callback of what should happen when that route is called
app.get('/', (req, res) => {
  res.send('Hello World from GET on root path'); // Sends the string as the response
});

app.post('/', (req, res) => {
  res.send('Hello world from POST on root path');
});

app.get('/search', (req, res) => {
  // The req in express provides additional functionality that the base HTTP req leaves out. One of these is req.query, which prevents the need for the url.parse method
  const name = req.query.name;
  const role = req.query.role;

  // res.json(data) is the same as doing res.end(JSON.stringify(data)) in http
  // If name exists, send it back as a json object
  if (name) {
    res.json({
      name
    });
    // If name does not exist and role does exist, send role back as a json object
  } else if (role) {
    res.json({
      role
    });
  } else {
    // If neither exist, return a string
    res.send('No query provided');
  }

  // res.send('In search');
});

// * will hit for ANY url, and is a way to handle invalid paths easily
app.get('*', (req, res) => {
  //res.send('Page does not exist, check your url.');
  // res.render will render the page back to the user
  res.render('error', { name: 'Jeff' });
});

// Make our server listen on a port
app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
