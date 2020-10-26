/*********************************************************************************
* WEB422 – Assignment 2
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Junsup Lee Student ID: 155838162 Date: January 30, 2019
*
*
********************************************************************************/ 

//use postman to check attribute name 
$(function() {
    console.log("jQuery is ready");
    
    let employeesModel = [];                                            // create empty array;

    initalizeEmployeesModel();                                          

    function initalizeEmployeesModel(){                                 //populate employeesModel;
        $.ajax({
            url:"https://calm-temple-53110.herokuapp.com/employees",
            type:"GET",
            contentType:"application/json"
        })
        .done(function(employees){
            employeesModel = employees;
            refreshEmployeeRows(employeesModel);
        })
        .fail(function(err){
            showGenericModal('Error', 'Unable to get Employees');
        });
    }

    function showGenericModal(title,message){                           //show modal that takes title and message;
        $(".modal-title").html("<strong>" + title + "</strong>");
        $(".modal-body").html(message);

        $("#genericModal").modal({                                      //only able to exit via 'x' click
            backdrop:'static',
            keyboard: false
        });
    }
                                                                        //display employeModel in template format
    function refreshEmployeeRows(employees){ //check teamsapi output to figure out attribute format. 
        let empTemplate = _.template('<% _.forEach(employees, function(employee) { %>' +
                                            '<div class="row body-row" data-id=<%- employee._id %>>' +
                                            '<div class="col-xs-4 body-column"><%- employee.FirstName %></div>' +
                                            '<div class="col-xs-4 body-column"><%- employee.LastName %></div>' +
                                            '<div class="col-xs-4 body-column"><%- employee.Position.PositionName %></div>' +
                                            '</div>' +
                                            '<% }); %>');
        $("#employees-table").empty();

        let employeeData = empTemplate({ 'employees': employees});
        
        $("#employees-table").append(employeeData);                  
    }

    function getFilteredEmployeesModel(filterString){                       //filters what to display from employeeModel. 
        let filteredEmployees = _.filter(employeesModel, function(employee){
            if(employee.FirstName.toLowerCase().indexOf(filterString) >= 0 || employee.LastName.toLowerCase().indexOf(filterString) >= 0 || employee.Position.PositionName.toLowerCase().indexOf(filterString) >= 0){
                return true;
            } else {
                return false;
            }
        });
        return filteredEmployees;
    }

    function getEmployeeModelById(id){                                      //searches employee via employeeid, and returns a copy ver of it.
        let getId = _.findIndex(employeesModel, function(employee){
            return employee._id === id;
        })

        if(getId >= 0 ){
            result = _.cloneDeep(employeesModel[getId]);
        } 

        return result;
    }
    
    $("#employee-search").keyup(function() {                               //on keystroke, invoke method
        let search = $("#employee-search").val();                          //takes value of search bar into search variable
        let filter = getFilteredEmployeesModel(search);                    //filter employeeModel that contains what's in search
        refreshEmployeeRows(filter);                                       //refresh display of employeeModel. 
    });

    $("#employees-table").on("click", ".body-row", function() {            //when employee is clicked from table, display its data as modal
        let clickedEmployee = getEmployeeModelById($(this).attr("data-id"));  // each row has unique data id of employee 

        clickedEmployee.HireDate = moment(clickedEmployee.HireDate).format("LL");        //format a moment of hiredate with 'LL'     

        let clickedTemplate = _.template(    //template of what message is passed to showmodal method. (employee details)
            '<strong>Address:</strong> <%- employee.AddressStreet %> <%- employee.AddressCity %> <%- employee.AddressState %>, <%- employee.AddressZip %><br>' +
            '<strong>Phone Number:</strong> <%- employee.PhoneNum %> ext: <%- employee.Extension %><br>' + 
            '<strong>Hire Date:</strong> <%- employee.HireDate %>');
        
        showGenericModal((clickedEmployee.FirstName + " " + clickedEmployee.LastName), clickedTemplate({ 'employee':clickedEmployee })
        );
    });
})