var Project = require('../models/projectModel');
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
	

	var ProjectCapacityMIN = req.body.capacityProjMIN;

	var ProjectCapacityMAX = req.body.capacityProjMAX;
	

	//console.log(req.body);


	var ProjectDesc = req.body.projectDescription;

	var ProjectDiscipline = req.body.discipline;

	var ProjectPrereq = req.body.priorSkill;



	var ProjectUpload = {
		title : ProjectTitle,
		supervisor : superVisor,
		supervisor2 : superVisor2,
		supervisor3 : superVisor3,
		capacityMIN : ProjectCapacityMIN,
		capacityMAX : ProjectCapacityMAX,
		description : ProjectDesc,
		prerequsites : ProjectPrereq,
		discipline : ProjectDiscipline
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
