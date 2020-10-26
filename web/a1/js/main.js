/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Junsup Lee Student ID: 155838162 Date: January 14, 2019
*
*
********************************************************************************/

$(function(){ // DOM Ready handler. equivalent to $(document).ready(function(){})
    console.log("JQuery is ready");  //response check to console to see if it is ready. 

    
    $("#teams-menu").on("click", function(){   //event method; on click. 
        event.preventDefault();  //prevent default action; stop the element from behaving like a regular link
        $.ajax({    //AJAX GET request with target url
            url: "https://calm-temple-53110.herokuapp.com/teams",
            type: "get",
            contentType: "application/json"
        })
        .done(function(teams){
            $("#id").empty();
            $(".well").html("<h3>Teams</h3>");  //same thing as #id, I just wanted to use class well instead.
            $(".well").append(JSON.stringify(teams));  //convert json data to string to render as plain text
        })
    });

    $("#employees-menu").on("click", function(){
        event.preventDefault();
        $.ajax({
            url: "https://calm-temple-53110.herokuapp.com/employees",
            type: "get",
            contentType: "application/json"
        })
        .done(function(employees){
            $("#id").empty();
            $(".well").html("<h3>Employees</h3>");
            $(".well").append(JSON.stringify(employees));
        })
    });

    $("#projects-menu").on("click", function(){
        event.preventDefault();
        $.ajax({
            url: "https://calm-temple-53110.herokuapp.com/projects",
            type: "get",
            contentType: "application/json"
        })
        .done(function(projects){
            $("#id").empty();
            $(".well").html("<h3>Projects</h3>");
            $(".well").append(JSON.stringify(projects));
        })
    });

    $("#positions-menu").on("click", function(){
        event.preventDefault();
        $.ajax({
            url: "https://calm-temple-53110.herokuapp.com/positions",
            type: "get",
            contentType: "application/json"
        })
        .done(function(positions){
            $("#id").empty();
            $(".well").html("<h3>Positions</h3>");
            $(".well").append(JSON.stringify(positions));
        })
    });

});

