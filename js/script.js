var data;

/**
 * [renderPage to load data dynamically using template]
 * @param  {[object]} value [object to be added]
 */
function renderPage(value){
  $('#placeholderID').loadTemplate($('#rowID'),value,{append:true});
}

/**
 * [loadData [loads the data from the json file]]
 */
function loadData(){
  if(localStorage.getItem("goaldata")==null){
      $.getJSON('goal.json',function(json){
        data=json;
        renderPage(data);
        localStorage.setItem("goaldata",JSON.stringify(data));
      });
  }else{
       data=JSON.parse(localStorage.getItem("goaldata"));
       renderPage(data);
       //localStorage.removeItem("goaldata");
  }
}



/**
 * [addGoal [adds goal to the table]]
 */
function addGoal(){
  //var checked=false;
  if($('#nameData').val()==""){
    alert("Please enter a name for the goal.");
  }else if($('#typeData').val()=="Choose Type"){
    alert("Please choose the type of goal.");
  }else if($('#datepicker').val()==""){
    alert("Please a deadline for the goal.");
  }else{
    var obj={
      "name":$('#nameData').val(),
      "type":$('#typeData').val(),
      "deadline":$('#datepicker').val()
    };
    data.push(obj);
    renderPage(obj);
    localStorage.setItem("goaldata",JSON.stringify(data));
    console.log(data);

  // Reset the form data
  $('#nameData').val("");
  $('#typeData').val("Choose Type");
  $('#datepicker').val("");
 }
}

/**
 * [deleteGoal   [To delete selected goal from table]]
 */
function deleteGoal(){
  /* We get the table object based on given id */
    var objTable = document.getElementById("goalTable");

    /* Get the current row length */
    var iRow = objTable.rows.length;

	/* Initial row counter */
	var counter = 0;

    /* Performing a loop inside the table */
	if (objTable.rows.length > 1) {
		for (var i = 0; i < objTable.rows.length; i++) {

			 /* Get checkbox object */
			var chk = objTable.rows[i].cells[0].childNodes[0];
			if (chk.checked) {
				/* if checked we del */
				objTable.deleteRow(i);
				iRow--;
				i--;
        data.splice(i,1);
        console.log(data);
        localStorage.setItem("goaldata",JSON.stringify(data));
				counter = counter + 1;


			}
		}

		/* Alert user if there is now row is selected to be deleted */
		if (counter == 0) {
			alert("Please select the row that you want to delete.");
		}
	}else{
		/* Alert user if there are no rows being added */
		alert("No rows to be deleted");
	}
}

// To highlight the row when checkbox is clicked
$('#goalTable').on('click','.test', function() {
  $(this).parent().parent().toggleClass("highlight")
});


$(document).ready(function () {

    //load the json data from data.json file
    loadData();
});
