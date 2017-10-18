var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var Coordinator = require('../models/coordinatorModel');
var node_xj = require('xls-to-json');
var csv = require('csvtojson');
var converter = require('csvtojson').Converter;
var path = require('path');

var SWAM;
var error = "";
var preferror = "";
var dueTime;


const csvFilePath =  path.resolve(__dirname, "..", "..", "public", "uploads", "csvFile.csv");

console.log(path.resolve(__dirname, "..", "..", "public", "uploads", "csvFile.csv"));

console.log()
var conv = new converter({});

conv.fromFile(csvFilePath, function (err, result)
	{
		if (err)
		{
			console.log("Cannot access csv csvFile");
		}

		SWAM = result;
		console.log(SWAM);
	});


function getTime()
{
	Coordinator.find({}, function (err, dueDate)
		{
			dueTime = dueDate[0].cutDate;
		});
}


exports.studentRegisterGet = function(req, res, next) 
{
	getTime();
	
	var Time = new Date().toLocaleDateString();
	var TempTime = Date.parse(Time);

	
	console.log(dueTime);
	console.log(TempTime);

	if (dueTime < TempTime)
	{
		res.status(400).send("You can no longer sumbit your project preferences, please contact the unit coordinator for more information.");
	}
	else 
	{
		Project.find({}).sort({'discipline': 1}).exec(function (err, proj)
		{
			if (err)
			{
				res.status(400).send("Could not access project list");
			}
			else 
			{
				res.render('StudentFrontEnd', {title: 'Student Project Allocation From', projects : proj, err: error, preferrs : preferror});
				error = "";
				preferror = "";
				//dueTime = null;
			}
		});
	}
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
	
	Student.find({studentID : sID}, function(err, studentCheck)
	{
		if(studentCheck.length)
		{
			error = "This student has already been registered.";
			return res.redirect('back');

		}
	})

	Student.find({phoneNumber : phoneNum}, function(err, phoneCheck)
	{
		if(phoneCheck.length)
		{
			error = "This phone number has been taken.";
			return res.redirect('back');

		}
	})

	console.log(req.body);
	var noneCount = 0;
	var prefCheck = Object.create(null);
	for (p in studentPreferences)
	{	
		if(studentPreferences[p] != "None")
		{
			var check = studentPreferences[p];
			if(check in prefCheck)
			{
				
				preferror = "Student cannot choose the same project twice.";
				return res.redirect('back');
			}

			prefCheck[check] = true;
		}
		else 
		{
			noneCount++;
		}
	}

	if (noneCount == 6 )
	{
		preferror = "Please select at least one preference. ";
		return res.redirect('back');
	}

	
	
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
      error = "Student has been successfully saved.";
      return res.redirect('back');
    		})
    .catch(err => {
      res.status(400).send("Student not save correctly");
    });
}



