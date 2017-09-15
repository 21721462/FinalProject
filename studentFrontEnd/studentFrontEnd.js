$(document).ready(function() {
    $.getJSON("projects.json", function(obj) {
        $.each(obj.Projects, function(key, value){
            $("<option>").val(value.projectName).text(value.projectName).appendTo(".projectOptions");
        });
    });
});

//$(".projectOptions").append('<option value=' + value.projectName + '>' + value.projectName + '</option>');


function submitForm(){
    
}
