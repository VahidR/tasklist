/*
* not mess up with global window scope !
*/
"use strict";


/*
*  The main object for the entire application.
*  OBS. It is NOT an object literal.. it is constructure based initialization
*/
function TaskAtHandApp () {
  var version = " v1.0";

  function setStatus (message) {
    $("#app>footer").text(message);
  }

  this.start = function () {
    $("#new-task-name").keypress(function(event){
      if(event.which == 13) { // enter key
        addTask();
        return false; // stop broswer for furthur processing, and move to focus() call
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
    var $task = $("#task-template .task").clone(); // copy an <li> and its children
    $("span.task-name", $task).text(taskName); // second arg of $() tells to only search within the context of $task
    $("#task-list").append($task);

    $("button.delete", $task).click(function(event){
      $task.remove(); // removes the <li>
    });

    $("button.moveUp", $task).click(function(event){
      $task.insertBefore($task.prev()); // insertBefore (prev) is for moving up !!
    });

    $("button.moveDown", $task).click(function(event){
      $task.insertAfter($task.next()); // insertAfter (next) is for moving down !!
    });

    $("span.task-name", $task).click(function(event){
        editTaskName($(this));
    });

    $("input.task-name", $task).change(function() {
       onChangeTaskName($(this));
      }).blur(function(){
          $(this).hide().siblings("span.task-name").show();
        });

  }

  function editTaskName ($span) {
    $span.hide().siblings("input.task-name").val($span.text()).show().focus();
  }

  function onChangeTaskName ($input) {
    $input.hide();
    var $span = $input.siblings("span.task-name");
    if($input.val()){
      $span.text($input.val());
    }
    $span.show();
  }

}

/*
*  Ignition point of application ... kind of main() in C lang
*/
$(function() {
  window.app = new TaskAtHandApp();
  window.app.start();
});
