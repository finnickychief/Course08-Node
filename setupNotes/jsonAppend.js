const http = require('http');
const url = require('url');
const fs = require('fs');

const { parseBody } = require('./utils');

const port = 4000;
http
  .createServer((req, res) => {
    const method = req.method;
    const reqUrl = req.url;

    if (method === 'PUT' && reqUrl.startsWith('/appendArray')) {
      // Step 1: Read the file
      parseBody(req).then(body => {
        body = JSON.parse(body);

        fs.readFile(body.fileName, (err, data) => {
          // Step 2: Convert to a real array that we can modify
          let array = JSON.parse(data);

          // Add new content to the end
          array.push(body.content);

          // Step 3: Convert back to JSON
          let json = JSON.stringify(array);

          // Overwrite the file
          fs.writeFile(body.fileName, json, (err, data) => {
            if (err) throw err;
            res.write(`Successfully added new content! New array is ${json} `);
            res.end();
          });
        });
      });
    } else {
      res.end('Working server!');
    }
  })
  .listen(port, err =>
    err ? console.log(err) : console.log(`Listening on port ${port}`)
  );
