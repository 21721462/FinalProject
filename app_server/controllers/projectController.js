var Project = require('../models/projectModel');
var flash = require('connect-flash');
exports.academicPageGet = function(req, res, next)
{
	res.render('AcademicFrontEnd', {title: 'Academic'});
}

// WORKING
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
	

	//console.log(req.body);


	var ProjectDesc = req.body.projectDescription;

	var ProjectDiscipline = req.body.discipline;

	var ProjectPrereq = req.body.priorSkill;

	var time = new Date().toLocaleString().toString();

	//console.log(time);

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
      //res.send("Project succesfully Saved to DB");
      return res.redirect('back');
    		})
    .catch(err => {
      res.status(400).send("Project not save correctly");
    });
}
