var Project = require('../models/projectModel');

exports.academicPageGet = function(req, res, next)
{
	res.render('AcademicFrontEnd', {title: 'Academic'});
}

exports.academicPagePost = function(req, res, next)
{
	var ProjectTitle =  req.body.projTitle;
	
	var superVisor = req.body.Supervisor1;
	

	var superVisor2 = req.body.Supervisor2;
	

	var superVisor3 = req.body.Supervisor3;
	

	var ProjectCapacity = req.body.capacityProj;
	

	console.log(req.body);


	var ProjectDesc = req.body.projectDescription;

	var ProjectDiscipline = req.body.discipline;

	var ProjectPrereq = req.body.priorSkill;



	var ProjectUpload = {
		title : ProjectTitle,
		supervisor : superVisor,
		supervisor2 : superVisor2,
		supervisor3 : superVisor3,
		capacity : ProjectCapacity,
		description : ProjectDesc,
		prerequsites : ProjectPrereq,
		discipline : ProjectDiscipline
	}

	var myProject = new Project(ProjectUpload);
	myProject.save()
	.then(item => {
      res.send("Project succesfully Saved to DB");
    		})
    .catch(err => {
      res.status(400).send("Project not save correctly");
    });
}