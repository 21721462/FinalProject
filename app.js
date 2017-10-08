var express = require('express');
var path = require('path');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var json2xls = require('json2xls');
//need to disccus this
var bcrypt = require('bcrypt');
var session = require('express-session');
var crypto = require('crypto');

//add favicon?
var logger = require('morgan');


var index = require('./app_server/routes/index');

var app = express();




// Setting up the mongoDB for use 
var mongoose = require('mongoose');
var mongoDatabase = 'mongodb://red:dog@ds137054.mlab.com:37054/cits3200d';
mongoose.Promise = global.Promise;
mongoose.connect(mongoDatabase, {useMongoClient: true,  promiseLibrary: global.Promise });
var database = mongoose.connection;
database.on('connected', console.log.bind(console, 'MongoDB connected.'));
database.on('error', console.error.bind(console, 'MongoDB connection error.'));
database.on('disconnected', console.log.bind(console, 'MongoDB disconnected.'));
	
//view engine setup (the way the html is rendered)
app.set('views', path.join(__dirname, 'app_server' , 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// // add passport dependencies 
// app.use(require('express-session')({
//   secret: 'm3Kf)FS@Cu8+qp31[mz-13ZJA3',
//   resave: false,
//   saveUninitialized: false
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

/*
var coordinator = require('./app_server/models/coordinatorModel');
passport.use(new LocalStrategy(coordinator.authenticate()));
passport.serializeUser(coordinator.serializeUser());
passport.deserializeUser(coordinator.deserializeUser());
*/



module.exports = app;
