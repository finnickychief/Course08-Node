const express = require('express');

const port = 4000;
// Declare the new application: app is now our server
const app = express();

// To attach a route to the application, use the name of the method you want to handle along with the route, and a callback of what should happen when that route is called
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Make our server listen on a port
app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
