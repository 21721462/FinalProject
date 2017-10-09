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
	Student.find({'_id': row}).exec(function(err, doc){
				console.log(JSON.stringify(doc));
				//doc.remove();
			});
	Student.find({'_id': row}).remove().exec();
	
}


exports.editRow = function(req, res){
	var row = req.body.rowID;
	//Student.find({'_id': row}).remove().exec();
	//console.log("old removed");
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