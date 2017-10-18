// TABS
function openTab(evt, tabName) {
    var i, tabContent, tabLinks;

    tabContent = document.getElementsByClassName("tabContent");
    for (i = 0; i < tabContent.length; i++) {
        tabContent[i].style.display = "none";
    }
        
    tabLinks = document.getElementsByClassName("tabLinks");
    for (i = 0; i < tabLinks.length; i++) {
        tabLinks[i].className = tabLinks[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
};



// TABLE
function sortTable(n, tableName) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableName);
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.getElementsByTagName("TR");
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 2); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++; 
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
};

function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="inline";
	
 var student_number=document.getElementById("student_number_row"+no);
 var last_name=document.getElementById("last_name_row"+no);
 var first_name=document.getElementById("first_name_row"+no);
 var specialisation=document.getElementById("specialisation_row"+no);
 var allocation=document.getElementById("allocation_row"+no);
 var supervisor=document.getElementById("supervisor_row"+no);
	
 var student_number_data=student_number.innerHTML;
 var last_name_data=last_name.innerHTML;
 var first_name_data=first_name.innerHTML;
 var specialisation_data=specialisation.innerHTML;
 var allocation_data=allocation.innerHTML; 
 var supervisor_data=supervisor.innerHTML; 
	
 student_number.innerHTML="<input type='text' id='student_number_text"+no+"' value='"+student_number_data+"'>";
 last_name.innerHTML="<input type='text' id='last_name_text"+no+"' value='"+last_name_data+"'>";
 first_name.innerHTML="<input type='text' id='first_name_text"+no+"' value='"+first_name_data+"'>";
 specialisation.innerHTML="<input type='text' id='specialisation_text"+no+"' value='"+specialisation_data+"'>";
 allocation.innerHTML="<input type='text' id='allocation_text"+no+"' value='"+allocation_data+"'>";
 supervisor.innerHTML="<input type='text' id='supervisor_text"+no+"' value='"+supervisor_data+"'>";
}

function save_row(no)
{
 var student_number_val=document.getElementById("student_number_text"+no).value;
 var last_name_val=document.getElementById("last_name_text"+no).value;
 var first_name_val=document.getElementById("first_name_text"+no).value;
 var specialisation_val=document.getElementById("specialisation_text"+no).value;
 allocation_val=document.getElementById("allocation_text"+no).value;
 supervisor_val=document.getElementById("supervisor_text"+no).value;

    
 document.getElementById("student_number_row"+no).innerHTML=student_number_val;
 document.getElementById("last_name_row"+no).innerHTML=last_name_val;
 document.getElementById("first_name_row"+no).innerHTML=first_name_val;
 document.getElementById("specialisation_row"+no).innerHTML=specialisation_val;
 document.getElementById("allocation_row"+no).innerHTML=allocation_val;
 document.getElementById("supervisor_row"+no).innerHTML=supervisor_val;

 document.getElementById("edit_button"+no).style.display="inline";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row(table)
{
 var new_student_number=document.getElementById("new_student_number").value;
 var new_last_name=document.getElementById("new_last_name").value;
 var new_first_name=document.getElementById("new_first_name").value;
 var new_specialisation=document.getElementById("new_specialisation").value;
 var new_allocation=document.getElementById("new_allocation").value;
 var new_supervisor=document.getElementById("new_supervisor").value;
	
 var table=document.getElementById(table);
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='student_number_row"+table_len+"'>"+new_student_number+"</td><td id='last_name_row"+table_len+"'>"+new_last_name+"</td><td id='first_name_row"+table_len+"'>"+new_first_name+"</td><td id='specialisation_row"+table_len+"'>"+new_specialisation+"</td><td id='allocation_row"+table_len+"'>"+new_allocation+"</td><td id='supervisor_row"+table_len+"'>"+new_supervisor+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_student_number").value="";
 document.getElementById("new_last_name").value="";
 document.getElementById("new_first_name").value="";
 document.getElementById("new_specialisation").value="";
 document.getElementById("new_allocation").value="";
 document.getElementById("new_supervisor").value="";
}
