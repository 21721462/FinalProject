/**
 * The main router for the CITS3200 Group D project
 */

var express = require('express');
var passport = require('passport');
var router = express.Router();

var coordinatorController = require('../controllers/coordinatorController');
var projectController = require('../controllers/projectController');
var studentController = require('../controllers/studentController');


/*
Coordinator Routes
*/

router.get('/coordinator', coordinatorController.coordinatorLogin);


router.post('/coordinatordeleterow', coordinatorController.deleteRow);

router.post('/coordinatorsaverow', coordinatorController.editRow);

router.post('/allocateProjects', coordinatorController.allocateProjects);

/*
Student Routes
*/


// Get request for student form submission
router.get('/student', studentController.studentRegisterGet);
// Posts the form for students data to the DB
router.post('/student', studentController.studentRegisterPost);

/*
Project Routes
*/

router.get('/project', projectController.academicPageGet);

router.post('/project', projectController.academicPagePost);

module.exports = router;
