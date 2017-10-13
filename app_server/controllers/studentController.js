var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var node_xj = require('xls-to-json');
var csv = require('csvtojson');
var converter = require('csvtojson').Converter;

var SWAM;

const csvFilePath = __dirname + '/ex.csv';

var conv = new converter({});

conv.fromFile(csvFilePath, function (err, result)
	{
		if (err)
		{

		}

		SWAM = result;
		console.log(SWAM);
	});

exports.studentRegisterGet = function(req, res, next) 
{
	Project.find({}, function (err, proj)
	{
		if (err)
		{
			res.status(400).send("Could not access project list");
		}
		else 
		{
			//console.log(proj);
			res.render('StudentFrontEnd', {title: 'Student Project Allocaion From', projects : proj});
		}
	});
}

exports.studentRegisterPost = function(req, res, next) 
{
	var fname = req.body.firstName;
	
	
	var lname = req.body.lastName;
	

	var sID = req.body.studentID;
	

	var phoneNum = req.body.studentPhoneNumber;
	
	var studentDiscipline = req.body.discipline;

	var studentPreferences = req.body.options;

	console.log(sID);
	console.log(SWAM[5].Person_ID);

	var studentWam = 0;

	for (var w in SWAM)
	{
		if (SWAM[w].Person_ID == sID)
		{
			studentWam = SWAM[w].Course_WAM; 
			console.log(SWAM[w].Course_WAM);
		}
	}
	

	console.log(req.body);
	
	var StudentUser = {
		firstName: fname,
		lastName: lname,
		studentID: sID,
		phoneNumber: phoneNum,
		discipline: studentDiscipline,
		wam: studentWam,
		preferences: studentPreferences,
		assignedProject: ""
	}

	var myStudent = new Student(StudentUser);
	myStudent.save()
	.then(item => {
      //res.send("Project succesfully Saved to DB");
      return res.redirect('back');
    		})
    .catch(err => {
      res.status(400).send("Student not save correctly");
    });
}



