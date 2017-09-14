var Student = require('../models/studentModel');


exports.submitForm = function (req, res){
	var fname = req.body.fname;
	var lname = req.body.lname;
	var snumber = req.body.snumber;
	var email = req.body.email;
	var pnumb = req.body.phonenum;
	var discip = req.body.discipline;
	var wamNumber = req.body.discipline


	var student = {
		firstName: fname,
		lastName: lname,
		studentNumber: snumber,
		phoneNumber: phonenum,
		discipline: discip,
		wam: wamNumber
	};

	var myStudent = new Student(student);

	myStudent.save()
}

exports.removeStudent = function (req, res) 
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

