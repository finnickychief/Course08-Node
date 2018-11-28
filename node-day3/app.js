const express = require('express');
const path = require('path');

const port = 4000;
// Declare the new application: app is now our server
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.send('Hello World from GET on root path');
});

app.post('/', (req, res) => {
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
app.get('*', (req, res) => {
  res.render('error', { name: 'Jeff' });
});

// Make our server listen on a port
app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
