var express   = require('express');
var app       = express();
var port      = process.env.PORT || 3000;
var mongoose  = require('mongoose');
var passport  = require('passport');
var flash     = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

mongoose.connect(configDB.url);

//require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');

//require for passport
app.use(session({ secret: 'ololokokoko'})); // session secret
app.use(passport.initialize());
app.use(passport.session());  // persistent login sessions
app.use(flash());   // use connect-flash for flash messages stored in session

// routes
require('./app/routes.js')(app, passport);

app.listen(port);
console.log('the magic happens on port ' + port);