/*
* not mess up with global window scope !
*/
"use strict";


/*
*  The main object for the entire application.
*  OBS. It is NOT an object literal.. it is constructure based initialization
*/
function TaskAtHandApp () {
  var version = "v1.0";

  function setStatus (message) {
    $("#app>footer").text(message);
  }

  this.start = function () {
    $("#new-task-name").keypress(function(event){
      if(event.which == 13) { // enter key
        addTask();
        return false;
      }
    }).focus();
    $("#app header").append(version);
    setStatus("ready");
  };

  function addTask() {
    var taskName = $("#new-task-name").val();
    if(taskName){
      addTaskElement(taskName);
      $("#new-task-name").val("").focus(); // reset the text field
    }
  }

  function addTaskElement(taskName) {
    var $task = $("<li></li>"); // the $ before variable is a good practice to remember it points to a jQuery object.
    $task.text(taskName);
    $("#task-list").append($task);
  }


}

/*
*  Ignition point of application ... kind of main() in C lang
*/
$(function() {
  window.app = new TaskAtHandApp();
  window.app.start();
});
