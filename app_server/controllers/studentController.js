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
var conv = new converter({});



// Set up submission due date 
function getTime()
{
	Coordinator.find({}, function (err, dueDate)
		{
			dueTime = dueDate[0].cutDate;
		});
}

// Display Student submission page
exports.studentRegisterGet = function(req, res, next) 
{
	//Check if csv file has been uploaded by Unit Coordinator, and fetch student WAMS
	conv.fromFile(csvFilePath, function (err, result)
	{
		if (err)
		{
			console.log("Cannot access csv csvFile");
		}

		SWAM = result;
	});
	getTime();
	
	var Time = new Date().toLocaleDateString();
	var TempTime = Date.parse(Time);

	if (dueTime < TempTime)
	{
		res.status(400).send("You can no longer submit your project preferences, please contact the unit coordinator for more information.");
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

	var studentWam = 0;

	for (var w in SWAM)
	{
		if (SWAM[w].Person_ID == sID)
		{
			studentWam = SWAM[w].Course_WAM; 
		}
	}
	
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

	Student.findOne({studentID : sID,firstName:fname}, function(err, studentCheck){
		if(!studentCheck){
			studentCheck = new Student();
		}
			studentCheck.firstName = fname;
			studentCheck.lastName = lname;
			studentCheck.studentID = sID;
			studentCheck.phoneNumber = phoneNum;
			studentCheck.discipline = studentDiscipline;
			studentCheck.wam = studentWam;
			studentCheck.preferences = studentPreferences;
			studentCheck.assignedProject = "";
			studentCheck.save(function(err){
			if(err){
			console.log(err);
		}
		else console.log("Success");
		}).then(item => {
        error = "Student has been successfully saved.";
        return res.redirect('back');
      		})
		.catch(err => {
			res.status(400).send("Student has not been saved. Please check your details and try again!");
		});
	});
	}




