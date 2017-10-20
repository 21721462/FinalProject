var Project = require('../models/projectModel');


var errormsg = "";

//Display Project subbmission page
exports.academicPageGet = function(req, res, next)
{
	res.render('AcademicFrontEnd', {title: 'Academic', error: errormsg});
	errormsg = "";
}


exports.academicPagePost = function(req, res, next)
{
	var ProjectTitle =  req.body.projTitle;
	
	var superVisor = req.body.Supervisor1;

	var superVisor2 = req.body.Supervisor2;

	var superVisor3 = req.body.Supervisor3;

	var superVisor4 = req.body.Supervisor4;

	var superVisor5 = req.body.Supervisor5;
	
	var ProjectCapacityMIN = req.body.capacityProjMIN;

	var ProjectCapacityMAX = req.body.capacityProjMAX;

	var ProjectDesc = req.body.projectDescription;

	var ProjectDiscipline = req.body.discipline;

	if (!ProjectDiscipline)
	{
		errormsg = "Please select at least one discipline.";
		return res.redirect('back');
	}

	var ProjectPrereq = req.body.priorSkill;

	var time = new Date().toLocaleString().toString();

	var ProjectUpload = {
		title : ProjectTitle,
		supervisor : superVisor,
		supervisor2 : superVisor2,
		supervisor3 : superVisor3,
		supervisor4 : superVisor4,
		supervisor5 : superVisor5,
		capacityMIN : ProjectCapacityMIN,
		capacityMAX : ProjectCapacityMAX,
		description : ProjectDesc,
		prerequsites : ProjectPrereq,
		discipline : ProjectDiscipline,
		timeStamp : time,
		numAllocated : 0
	}

	var myProject = new Project(ProjectUpload);
	myProject.save()
	.then(item => {
	  errormsg = "Project has been saved successfully";
      return res.redirect('back');
    		})
    .catch(err => {
      res.status(400).send("Project has not been saved successfully");
    });
}
