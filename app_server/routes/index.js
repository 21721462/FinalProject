/**
 * The main router for the CITS3200 Group D project
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

var coordinatorController = require('../controllers/coordinatorController');
var projectController = require('../controllers/projectController');
var studentControler = require('../controllers/studentControler');

/*
Coordinator Routes
*/

router.get('/coordinator', coordinatorController. )