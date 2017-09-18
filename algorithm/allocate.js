function allocate(studentList, projectList){
	/* Sort by descending WAM order */
	students.sort(function(a, b) {
	    return b.WAM - a.WAM;
	});

	for(var student of studentList){										//Iterate through the student list
		var allocated = false;
		for(var preference of student.preferences){							//Iterate through each student's preference list
			for(var project of projectList){								//Iterate through the list of projects
				if(preference == project.projectName){						//Compare the project to the preference
					if(project.discipline.includes(student.discipline)){	//Check if discipline matches
						if(project.capacity > 0){							//Check for availability
							student.assignedProject = project.projectName;	//Assign and move onto the next student
							project.capacity -= 1;
							allocated = true;
							break;
						}
					}
				}
			}
			if(allocated){
				break;
			}
		}
	}
}

allocate(students, projects);