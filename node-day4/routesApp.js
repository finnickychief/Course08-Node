const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const port = 4000;
const app = express();

app.use(morgan('dev'));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// /dan_abramov/status/1067875748378288128
app.get('/:username/status/:statusId', (req, res) => {
  let { username, statusId } = req.params;

  res.json({ username, statusId });
});

// /user/1veritasium
app.get('/user/:user', (req, res) => {
  let { user } = req.params;

  res.json({ user: user });
});

// /api/path.html
app.get('/api/:page', (req, res) => {
  let { page } = req.params;

  res.json({ page: page });
});

// /wiki/Andorra
app.get('/wiki/:subject', (req, res) => {
  let { subject } = req.params;

  res.json({ subject: subject });
});

// /user/TechGuyWeb/videos
app.get('/user/:user/videos', (req, res) => {
  let { user } = req.params;

  res.json({ user: user });
});

// /messages/C8QA5LG7R/
app.get('/messages/:channel', (req, res) => {
  let { channel } = req.params;
  res.json({ channel: channel });
});

// /finnickychief?tab=repositories
// app.get('/:user', (req, res) => {
//   let { user } = req.params;
//   res.json({ user: user, query: req.query });
// }); // Commented out to not interfere with further routes

// /user/jtpwhat?question=who%20are%20you
app.get('/user/:user', (req, res) => {
  let { user } = req.params;
  res.json({ user: user, query: req.query });
});

// /watch?v=BQGxEn9oWxc
app.get('/watch', (req, res) => {
  res.json({ query: req.query });
});

// /finnickychief/Course08-Node
// app.get('/:user/:repo', (req, res) => {
//   let { user, repo } = req.params;
//   res.json({ user: user, repo: repo });
// });

// /post/SJThFEwa8?line=8
app.get('/post/:postId', (req, res) => {
  let { postId } = req.params;
  res.json({ postId: postId, query: req.query });
});

// /en/guide/using-middleware.html
app.get('/:language/guide/:page', (req, res) => {
  let { language, page } = req.params;
  res.json({ language: language, page: page });
});

// /products/sports?search=LT&search=20
app.get('/products/:type', (req, res) => {
  let { type } = req.params;
  res.json({ type: type, query: req.query });
});

// /search?source=hp&ei=0wAAXLHADK2d_Qbpjp_AAg&q=test+search&btnK=Google+Search&oq=test+search
app.get('/search', (req, res) => {
  res.json({ query: req.query });
});

// /s/the-upgrade/the-bogus-tech-deals-to-avoid-this-holiday-season-9ee01e1b40a2
app.get('/s/:username/:article', (req, res) => {
  let { username, article } = req.params;

  res.json({ username: username, article: article });
});

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(port, err => {
  err ? console.log(err) : console.log(`Server is now running on ${port}`);
});
