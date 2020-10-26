/*********************************************************************************
* WEB422 – Assignment 3
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Junsup Lee Student ID: 155838162 Date: February 11, 2019
*
*
********************************************************************************/ 

// Define viewModel with knockout observable properties that's an array;
let viewModel = {
    teams: ko.observable([]),
    employees: ko.observable([]),     
    projects: ko.observable([])   
};                                 

//populate observable property within viewModel.
function initializeTeams(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url:"https://calm-temple-53110.herokuapp.com/teams-raw",
            type:"GET",
            contentType:"application/json"
        })
        .done(function(data){
            viewModel.teams = ko.mapping.fromJS(data);
            resolve();      
        })
        .fail(function(err){
            //showGenericModal('Error', 'Unable to get Employees');
            reject("Error loading the team data");
        });
    })
}

function initializeEmployees(){                                 //populate employeesModel;
    return new Promise(function(resolve, reject){
        $.ajax({
            url:"https://calm-temple-53110.herokuapp.com/employees",
            type:"GET",
            contentType:"application/json"
        })
        .done(function(data){
            viewModel.employees = data;
            resolve();
        })
        .fail(function(err){
            reject("Error loading the employee data");
        });
    })
    
}

function initializeProjects(){
    return new Promise(function(resolve,reject){
        $.ajax({
            url:"https://calm-temple-53110.herokuapp.com/projects",
            type:"GET",
            contentType:"application/json"
        })
        .done(function(data){
            viewModel.projects = ko.mapping.fromJS(data);
            resolve();      
        })
        .fail(function(err){
            reject("Error loading the 'project' data");
        });
    })
}

//send updated team data to the correct route in the API 
function saveTeam(){
    let currentTeam = this;
    
    $.ajax({
        url:"https://calm-temple-53110.herokuapp.com/team/" + currentTeam._id(),
        type:"PUT",
        data: JSON.stringify({
            Projects: currentTeam.Projects(),
            Employees: currentTeam.Employees(),
            TeamLead: currentTeam.TeamLead()
        }),
        contentType: "application/json"
    })
    .done(function(data){
        showGenericModal("Success", currentTeam.TeamName() + " Updated Successfully");
    })
    .fail(function(err){
        showGenericModal("Error", "Error updating the team information");
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

$(function() {
    console.log("jQuery is ready");
    
    //promise chain populating tables
    initializeTeams()
    .then(initializeEmployees)
    .then(initializeProjects)
    .then(function(){
        ko.applyBindings(viewModel, $("body")[0]);
        $("select.multiple").multipleSelect({ filter: true });
        $("select.single").multipleSelect({ single: true, filter: true });
    })
    .catch(function(rejectMsg){
        showGenericModal("Error",rejectMsg);
    });        
})


    