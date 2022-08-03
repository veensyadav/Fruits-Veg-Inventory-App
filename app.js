var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');

// Set up mongoose connection
const mongoose = require('mongoose');

const mongoDB_URI = 'mongodb://localhost:27017/test';
// const mongoDB_URI = 'mongodb+srv://root:root@cluster0.ca8mp.mongodb.net/test';
mongoose.connect(mongoDB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var indexRouter = require('./routes/index');

const compression = require('compression');
const helmet = require('helmet');

if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

var app = express();

// Use helmet
// app.use(helmet());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// serve static content
app.use(express.static(__dirname + '/public'));
app.use('/uploads', express.static('uploads'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
