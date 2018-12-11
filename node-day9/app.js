const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

mongoose.connect(
  'mongodb://localhost:27017/test',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log('Error: ', err);
      return;
    }
    console.log('MongoDB is connected');
  }
);
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Register the session middleware:
app.use(
  session({
    secret: 'Secret codeword!',
    // make cookies tied to this session die after one duration
    cookie: { maxAge: 600000 },
    // saveUnitialized: false only allocates space when it is needed, not by default
    saveUninitialized: false
  })
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
