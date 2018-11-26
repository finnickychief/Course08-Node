const http = require('http');
const url = require('url');

const { parseBody } = require('./utils');

const port = 4000;

// createServer sets up a HTTP server and takes a callback that determines what should happen when a request is received.
http
  .createServer((req, res) => {
    console.log(`We've received a request!`);

    // Write head with response code 200 and a header of content-type: text/html
    res.writeHead(200, { 'Content-type': 'text/html' });

    // Parsing out the body data chunks:
    parseBody(req).then(body => {
      // End parsing body

      let query = url.parse(req.url, true).query;
      const txt = `${query.year} ${query.month}`;
      // console.log(url);
      // let { body } = req;

      res.end(body);
    });
  })
  .listen(port, err =>
    err ? console.log(err) : console.log(`Listening on port ${port}`)
  );
