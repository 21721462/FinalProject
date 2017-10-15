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
		Project.find().exec(function(err, projectList) {
			res.render('coordinatorFrontEnd',{title: "Coordinator Front End", jsonthing: JSON.stringify(studentList), jsonProject: JSON.stringify(projectList)});
		});
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

exports.allocateProjects = function (req, res) {
	Project.update({}, { $set: { numAllocated: "0" }}, {multi: true}, function (err) {if(err) return handleError(err);}); //Reset numAlloc
	Student.update({}, { $set: { assignedProject: "" }}, {multi: true},function (err) {if(err) return handleError(err);}); //Reset assignedProj
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
							else console.log("Discipline mismatch!"); //DEBUG
						} //Preference match
					} //Project iterate
					if(allocated) break;
				} //Preference iterate
			} //Student iterate
		}); //Project find
	}); //Student find
}

exports.deleteRow = function(req, res){
	console.log("removed row");
	var row = req.body.rowID;
	Student.find({'_id': row}).exec(function(err, doc){
				console.log(JSON.stringify(doc));
				//doc.remove();
			});
	Student.find({'_id': row}).remove().exec();
	
}


exports.editRow = function(req, res){
	var row = req.body.rowID;
	//Student.find({'_id': row}).remove().exec();
	console.log("old removed");
	Student.findOne({'_id': row}, function(err, student){
		student.firstName = req.body.fName;
		student.lastName = req.body.lName;
		student.studentID = req.body.ID;
		student.assignedProject = req.body.projAlloc;
		console.log(student);
		student.save(function(err){
			if(err){
			console.log(err);
		}
		else console.log("Success");
		}).then();

				return;
	});
// 	var sID = req.body.ID;
// 	var lNameLocal = req.body.lName;
// 	var fNameLocal = req.body.fName;
// 	var projectAllocation = req.body.projAlloc;
// 	//console.log("variables collected");
// 	console.log(sID);
// 	console.log(lNameLocal);
// 	console.log(fNameLocal);
// 	var newData = {
// 		firstName: fNameLocal,
// 		lastName: lNameLocal,
// 		studentID: sID
// 	}
// 	var toSend = new Student(newData);
// 	toSend.save(function(err){
//       if(err){
//            console.log(err);
//            return;
//       }

//       res.json({ token: generateToken(user), user: user });
// });

	//Student.add({firstName: fNameLocal, lastName: lNameLocal, studentID: sID}).exec();//, assignedProject: projectAllocation})
	console.log("new row added");
}

var remove = function(rowNumber){
	Student.find({'_id': row}).exec(function(err, doc){
				console.log(JSON.stringify(doc));
				//doc.remove();
			});
	Student.find({'_id': row}).remove().exec();
}
// Display Student Front End