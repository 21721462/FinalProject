var request = require('request');
var passport = require('passport');
var Coordinator = require('../models/coordinatorModel');
var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var validator = require('validator');
var Student = require('../models/studentModel');
var Grid = require('editable-grid')
$ = require('jquery');

// Display the cooridnator main page
exports.cooridnatorLogin = function(req, res, next) {
	res.render('cooridnatorMainPage');
}


exports.removeStudent = function (req, res) 
{
	
}

exports.createGrid = function(req, res, next){
	
}



exports.editStudent = function (req, res)
{

}

exports.sendEmailALL = function (req, res)
{

}

exports.sendEmailIndividual = function (req, res)
{

}


// Display Student Front End