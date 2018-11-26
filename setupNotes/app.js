const http = require('http');
// createServer sets up a HTTP server and takes a callback that determines what should happen when a request is received.
http
  .createServer((req, res) => {
    console.log(`We've received a request!`);

    // Write head with response code 200 and a header of content-type: text/html
    res.writeHead(200, { 'Content-type': 'text/html' });

    let url = req.url;
    console.log(url);
    // let { body } = req;

    res.end(url);
  })
  .listen(4000);
