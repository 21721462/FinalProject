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
exports.coordinatorLogin = function(req, res, next) {
	res.render('coordinatorMainPage');
}

exports.removeStudent = function (req, res) 
{
	
}

exports.createGrid = function(req, res, next)
{
	
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

exports.allocateProjects = function (req, res) {
	Project.update({}, { $set: { numAllocated: "0" }}, {multi: true}, function (err) {if(err) return handleError(err);}); //DEBUG
	Student.find({}).sort({'wam' : -1}).exec(function (serr, students) {
		if(serr) return serr;
		Project.find({}).exec(function (perr, projects) {
			if(perr) return perr;
			//console.log(projects);
			for(var student of students) {
				console.log(student.firstName, student.preferences);
				var allocated = false;
				for(var pref of student.preferences) {
					//console.log(student.firstName, pref);
					for(var project of projects) {
						if(pref == project.title) {
							if(project.discipline.includes(student.discipline)) {
								if(project.numAllocated < project.capacityMAX) {
									student.assignedProject = project.title; //DEBUG
									project.numAllocated++;
									Student.update({_id: student.id}, { $set: { assignedProject: project.title }}, function (err) {if(err) return handleError(err);});
									Project.update({_id: project.id}, { $set: { numAllocated: project.numAllocated }}, function (err) {if(err) return handleError(err);});
									console.log("%s was allocated to %s!\n", student.firstName, student.assignedProject); //DEBUG
									allocated = true;
									break;
								} //Check capacity
								else console.log("Project full!"); //DEBUG
							} //Discipline match
						} //Preference match
					} //Project iterate
					if(allocated) break;
				} //Preference iterate
			} //Student iterate
		}); //Project find
	}); //Student find
}
// Display Student Front
