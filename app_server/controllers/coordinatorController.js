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
export.cooridnatorLogin = function(req, res, next) {
	res.render('cooridnatorMainPage');
}


exports.removeStudent = function (req, res) 
{
	var StudentRemove = req.body.
 	Student.find({req.body.})
}

exports.createGrid = function(req, res, next){
	var deleteButton = $('<button type="button" class="btn btn-primary btn-sm" ' +
            'style="margin-bottom: 10px">Turn ON Deletion</button>');

	var tableContainer = $('<div></div>');
        el.append(deleteButton);
        el.append(tableContainer);


	var grid = new Grid ({
		req.body : tableContainer,
		columns: [
		{
			id: 'firstname'
			title: 'First Name',
			width: '25%'
		},
		{
			id: 'lastname'
			title: 'Last Name',
			width: '25%'
		},
		{
			id: 'firstname'
			title: 'First Name',
			width: '25%'
		},
		{
			id: 'firstname'
			title: 'First Name',
			width: '25%'
		},
		{
			id: 'firstname'
			title: 'First Name',
			width: '25%'
		}

		]
	})
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