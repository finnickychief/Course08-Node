const http = require('http');
const url = require('url');
const fs = require('fs');

const { parseBody } = require('./utils');

const port = 4000;

http
  .createServer((req, res) => {
    const method = req.method;
    const reqUrl = req.url;

    const query = url.parse(reqUrl, true).query;

    console.log(`We've received a request!`);

    if (method === 'GET' && reqUrl.startsWith('/readFile')) {
      fs.readFile(query.fileName, (err, data) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });

        let returnObj = { contents: JSON.parse(data.toString()) };
        let returnString = JSON.stringify(returnObj);

        res.write(returnString);

        res.end();
      });
    } else if (method === 'POST' && reqUrl.startsWith('/writeFile')) {
      parseBody(req)
        .then(body => {
          body = JSON.parse(body);
          let fileName = body.fileName;
          let json = JSON.stringify(body.content); // Generate json to put into our file

          // First parameter is the name of the file
          // Second parameter is what you want to put into the file
          // Third parameter is a callback for instructions on what to do after the file is written
          fs.writeFile(fileName, json, (err, data) => {
            if (err) throw err;

            console.log('Saved new file');

            res.end('Saved new file successfully!');
          });
        })
        .catch(err => console.log(err));
    } else {
      fs.readFile('demo.html', (err, data) => {
        res.write(data);
        res.end();
      });
    }
  })
  .listen(port, err =>
    err ? console.log(err) : console.log(`Listening on port ${port}`)
  );
