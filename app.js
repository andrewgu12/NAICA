require('babel-register');
const express        = require('express');
const path           = require('path');
const favicon        = require('serve-favicon');
const logger         = require('morgan');
const cookieParser   = require('cookie-parser');
const bodyParser     = require('body-parser');
const mongoose       = require('mongoose');
const expressSession = require('express-session');
const passport       = require('passport');
const MongoStore     = require('connect-mongo')(expressSession);

// routes
const routes      = require('./routes/index');
const events      = require('./routes/events');
const admin       = require('./routes/admin');
const about       = require('./routes/about');
const newsletters = require('./routes/newsletters');

const app    = express();

// mongoDB connection
const configDB = require('./config/connection.js');
mongoose.connect(configDB.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// store session in sessions collection
app.use(expressSession({
  secret: configDB.sessionSecret,
  store: new MongoStore({mongooseConnection: mongoose.connection}),
  saveUninitialized: true,
  cookie: { maxAge: 2000000 }, //session will expire in half an hour
  resave: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);
app.use('/events', events);
app.use('/admin', admin);
app.use('/about',about);
app.use('/newsletters', newsletters);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.locals.pretty = true;
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  app.locals.pretty = true;
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
