var Student = require('../models/studentModel');
var Project = require('../models/projectModel');
var node_xj = require('xls-to-json');
var csv = require('csvtojson');
var converter = require('csvtojson').Converter;

var SWAM;
var error = "";
var preferror = "";

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



