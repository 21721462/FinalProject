var request = require('request');
var passport = require('passport');
var Coordinator = require('../models/coordinatorModel');
var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var validator = require('validator');
var Grid = require('editable-grid')
$ = require('jquery');

// Display the cooridnator main page
exports.coordinatorLogin = function(req, res, next) {
	Student.find().exec(function(err, studentList){
    	console.log(studentList);
    	console.log(JSON.stringify(studentList));
		res.render('coordinatorFrontEnd',{title: "Coordinator Front End", jsonthing: JSON.stringify(studentList)});
	});
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

exports.deleteRow = function(req, res){
	var row = req.body.rowID;
	console.log(row);
	Student.find({'_id': row}).exec(function(err, doc){
				console.log(JSON.stringify(doc));
				//doc.remove();
			});
	Student.find({'_id': row}).remove().exec();
}
			// var toDelete = Student.findOne({'_id': rowID}).exec(function(err, doc){
			// 	doc.remove();
			// };


// Display Student Front End