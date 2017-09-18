var studenttable = "<table border='1|1'>";
studenttable += "<th>"+"Student ID"+"</th>";
studenttable += "<th>"+"Last Name"+"</th>";
studenttable += "<th>"+"First Name"+"</th>";
studenttable += "<th>"+"WAM"+"</th>";
studenttable +="<th>"+"Discipline"+"</th>";
studenttable += "<th>"+"Preferences"+"</th>";

for(var key in students){
	var obj = students[key];

	studenttable +="<tr>";
	studenttable +="<td>"+obj.studentID+"</td>";
	studenttable +="<td>"+obj.lastName+"</td>";
	studenttable +="<td>"+obj.firstName+"</td>";
	studenttable +="<td>"+obj.WAM+"</td>";
	studenttable +="<td>"+obj.discipline+"</td>";
	studenttable +="<td>"+obj.preferences+"</td></tr>";
}
studenttable += "</table>";

var projecttable = "<table border='1|1'>";
projecttable += "<th>"+"Project Topic"+"</th>";
projecttable += "<th>"+"Capacity"+"</th>";
projecttable += "<th>"+"Discipline"+"</th>";

for(var key in projects){
	var obj = projects[key];

	projecttable +="<tr>";
	projecttable +="<td>"+obj.projectName+"</td>";
	projecttable +="<td>"+obj.capacity+"</td>";
	projecttable +="<td>"+obj.discipline+"</td></tr>";
}
projecttable += "</table>";

var allocationtable = "<table border='1|1'>";
allocationtable += "<th>"+"Student ID"+"</th>";
allocationtable += "<th>"+"Last Name"+"</th>";
allocationtable += "<th>"+"First Name"+"</th>";
allocationtable += "<th>"+"Project Topic"+"</th>";

students.sort(function(a, b) {
    return (a.assignedProject===null)-(b.assignedProject===null) || +(a.assignedProject>b.assignedProject)||-(a.assignedProject<b.assignedProject);
});

for(var key in students){
	var obj = students[key];
	allocationtable +="<tr>";
	allocationtable +="<td>"+obj.studentID+"</td>";
	allocationtable +="<td>"+obj.lastName+"</td>";
	allocationtable +="<td>"+obj.firstName+"</td>";
	allocationtable +="<td>"+obj.assignedProject+"</td></tr>";
}
allocationtable += "</table>";

document.getElementById("students").innerHTML = studenttable;
document.getElementById("projects").innerHTML = projecttable;
document.getElementById("allocations").innerHTML = allocationtable;