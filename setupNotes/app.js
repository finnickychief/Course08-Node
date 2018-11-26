const http = require('http');
const url = require('url');
const fs = require('fs');

const { parseBody } = require('./utils');

const port = 4000;

http
  .createServer((req, res) => {
    const method = req.method;
    const reqUrl = req.url;

    console.log(`We've received a request!`);

    if (method === 'POST' && reqUrl.startsWith('/writeFile')) {
      parseBody(req)
        .then(body => {
          body = JSON.parse(body);
          let fileName = body.fileName;
          let json = JSON.stringify(body.content); // Generate json to put into our file

          // First parameter is the name of the file
          // Second parameter is what you want to put into the file
          // Third parameter is a callback for instructions on what to do after the file is written
          fs.writeFile('' + fileName, json, (err, data) => {
            if (err) throw err;

            console.log('Saved new file');

            res.end('Saved new file successfully!');
          });
        })
        .catch(err => console.log(err));
    } else {
      res.end('Your request could not be handled.');
    }
  })
  .listen(port, err =>
    err ? console.log(err) : console.log(`Listening on port ${port}`)
  );
