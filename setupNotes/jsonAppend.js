const http = require('http');
const fs = require('fs');

const { parseBody } = require('./utils');

const port = 4000;
http
  .createServer((req, res) => {
    const method = req.method;

    res.end('Working server!');
  })
  .listen(port, err =>
    err ? console.log(err) : console.log(`Listening on port ${port}`)
  );
