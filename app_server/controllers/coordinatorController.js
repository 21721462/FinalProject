var request = require('request');
var passport = require('passport');
var Coordinator = require('../models/coordinatorModel');
var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var validator = require('validator');
var Grid = require('editable-grid');
var nodemailer = require('nodemailer');
var fileUpload = require('express-fileupload');




// var emailer = nodemailer.createTransport({
// 	service: 'gmail'
// 	{
// 		auth: {
			
// 		}
// 	}
// })
var cuttoffDateTEMP;
var passthroughDate;
var CoordinatorPass;

Coordinator.find({}, function(err, data)
{
	var cuttoffDateTEMP1 = new Date(parseInt(data[0].cutDate, 10));
	console.log(cuttoffDateTEMP1);
	cuttoffDateTEMP = cuttoffDateTEMP1.toString();
	passthroughDate = data[0].cutDate;
	CoordinatorPass = data[0].password;
});

exports.uploadcsv = function(req, res, next)
{
	return res.redirect('back');
}

// Display the coordinator main page
exports.coordinatorLogin = function(req, res, next) {
	Student.find().exec(function(err, studentList){
		Project.find().exec(function(err, projectList) {
			res.render('CoordinatorFrontEnd',{title: "Coordinator Front End", jsonthing: JSON.stringify(studentList), jsonProject: JSON.stringify(projectList), cuttoffDate : cuttoffDateTEMP.toLocaleString()});
		});
	});
}

exports.coordinatorLoginGet = function(req, res, next) {
	res.render('CoordinatorLogin', {title: "Coordinator Login", error : ""});
}



exports.coordinatorLoginPost = function(req, res, next)
{
	console.log(CoordinatorPass);
	console.log(req.body.password);
	if (CoordinatorPass == req.body.password)
	{
		res.redirect('/coordinator');
	}
	else
	{
		res.render('CoordinatorLogin', {title: "Coordinator Login", error : "Incorrect Password"});
	}
}

exports.setdueDate = function(req, res, next)
{

	
	

	console.log(passthroughDate);
	console.log(req.body.password);
	if (req.body.passupdate == undefined && req.body.cuttoff != undefined)
	{
		var fullDate = req.body.cuttoff;
		var milliDate = Date.parse(fullDate);
		var cuttoffDateTEMP1 = new Date(parseInt(milliDate, 10));
		cuttoffDateTEMP = cuttoffDateTEMP1.toString();
		
		var dateStore = {
			cutDate : milliDate,
			password: CoordinatorPass
		}
		passthroughDate = milliDate;
	}
	else if(req.body.passupdate != undefined && req.body.cuttoff == undefined)
	{
		console.log(passthroughDate);
		console.log(req.body.passupdate);
		var dateStore = {
			cutDate : passthroughDate,
			password: req.body.passupdate
		}
		CoordinatorPass = req.body.passupdate;
	}
	var myDate = new Coordinator(dateStore);
	var upData = myDate.toObject();

	delete upData._id;

	Coordinator.findOneAndUpdate({}, upData, {upsert: true}, function(err, doc)
	{
		if (err)
		{
			console.log("could not update data");
		}
		return res.redirect('back');
	});
	

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
				console.log(student.firstName, student.preferences); //DEBUG
				var allocated = false;
				for(var pref of student.preferences) {
					//console.log(student.firstName, pref);
					for(var project of projects) {
						if(pref == project.title) {
							for(var i = 0; i < project.discipline.length; i++) project.discipline[i].toLowerCase();
							if(project.discipline.includes(student.discipline.toLowerCase())) {
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

exports.deleteAllEntries = function(req, res){
	Project.remove({}, function(err,removed) {
	});
	Student.remove({}, function(err,removed) {
	});

}


exports.deleteRowProject = function(req, res){
	Project.find({'_id': req.body.rowID}).remove().exec();
}

exports.deleteRowStudent = function(req, res){

	Project.findOne({"title": req.body.oldProject}, function(err, project){
			if(project) {
				project.numAllocated--;
				project.save(function(err){
					if(err){
						console.log(err);
					}
					else console.log("Successful reduction");
					});
				}
		});
	Student.find({'_id': req.body.rowID}).remove().exec();
	
}

exports.editRowProject = function(req, res){
	var row = req.body.rowID;
	Project.findOne({'_id': row}, function(err, project){
		if(!project){
			project = new Project();
			project.title = "untitled";
			project.supervisor = "None"; 
			project.supervisor2 = "None"; 
			project.supervisor3 = "None";
			project.supervisor4 = "None";
			project.supervisor5 = "None"; 
			project.capacityMIN = 0;
			project.capacityMAX = 10;
			project.description = "None"
			project.prerequisites = "None"
			project.discipline = ["None"]; //[{type: String, unique: false, required: false}],
			project.timeStamp = new Date().toLocaleString().toString();
			project.numAllocated = 0;
		}
		if(req.body.titleIn) {project.title = req.body.titleIn;}
		if(req.body.supervisor1In) {project.supervisor = req.body.supervisor1In;}
		if(req.body.supervisor2In) {project.supervisor2 = req.body.supervisor2In;}
		if(req.body.supervisor3In) {project.supervisor3 = req.body.supervisor3In;}
		if(req.body.supervisor4In) {project.supervisor4 = req.body.supervisor4In;}
		if(req.body.supervisor5In) {project.supervisor5 = req.body.supervisor5In;}
		if(req.body.capacityMINIn) {project.capacityMIN = req.body.capacityMINIn;}
		if(req.body.capacityMAXIn) {project.capacityMAX = req.body.capacityMAXIn;}
		if(req.body.descriptionIn) {project.description = req.body.descriptionIn;}
		if(req.body.prerequisitesIn) {project.prerequisites = req.body.prerequisitesIn;}
		if(req.body.disciplineIn) {project.discipline = req.body.disciplineIn.split(",").strip();}
		if(req.body.timeSubmittedIn) {project.timeStamp = req.body.timeSubmittedIn;} //this is going to update the timestamp on an edit but its easy to just leave as the timestamp when created
		if(req.body.numAllocatedIn) {project.numAllocated = req.body.numAllocatedIn;}

		project.save(function(err){
			if(err){
			console.log(err);
		}
		else console.log("Success");
		}).then();

	});
}
exports.editRowStudent = function(req, res){
	var row = req.body.rowID;
	Student.findOne({'_id': row}, function(err, student){
		if(!student){
			console.log('student is new!');
			student = new Student();
			student.firstName = "John";
			student.lastName = "Doe";
			student.studentID = "0";
			student.phoneNumber = "04";
			student.discipline = "None Specified";
			student.wam = 0.0;
			student.preferences = ["None","None","None","None","None","None"];
			student.assignedProject=  "None";
		}
		if(req.body.fName) { student.firstName = req.body.fName; }
		if(req.body.lName) {student.lastName = req.body.lName; }
		if(req.body.pNumber) {student.phoneNumber = req.body.pNumber; }
		if(req.body.disc) {student.discipline = req.body.disc; }
		if(req.body.ID) {student.studentID = req.body.ID; }
		if(req.body.wamInput) {student.wam = req.body.wamInput; }
		if(req.body.pref1) {student.preferences[0] = req.body.pref1; }
		if(req.body.pref2) {student.preferences[1] = req.body.pref2; }
		if(req.body.pref3) {student.preferences[2] = req.body.pref3; }
		if(req.body.pref4) {student.preferences[3] = req.body.pref4; }
		if(req.body.pref5) {student.preferences[4] = req.body.pref5; }
		if(req.body.pref6) {student.preferences[5] = req.body.pref6; }
		if(req.body.projAlloc) {student.assignedProject = req.body.projAlloc; }

		console.log(student);
		student.markModified("preferences");
		student.save(function(err){
			if(err){
			console.log(err);
		}
		else{ console.log("Success save");}
		}).then();


				Project.findOne({"title": req.body.oldProject}, function(err, project){
			if(project) {
				project.numAllocated--;
				project.save(function(err){
					if(err){
						console.log(err);
					}
					else console.log("Success change");
					});
				}
				else {console.log("no project found");
						console.log(req.body.oldProject);
						}
		});
		Project.findOne({"title": req.body.projAlloc}, function(err, project){
			if(project) {
				project.numAllocated++;
				project.save(function(err){
				if(err){
					console.log(err);
				}
				else console.log("Success change");
				});
			}
		});

				return;
	});
	console.log("new row added");
}
