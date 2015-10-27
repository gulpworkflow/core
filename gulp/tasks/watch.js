// Generate watch tasks for all enabled watchable tasks
// -----------------------------------------------------
// all tasks in the config.yml have a flag for enable_watch.enable
// if that's true and the task itself is enabled, then a watch task
// is generated below. 
//
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('gulp/config.yml').tasks;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var watch           = require('gulp-watch')
var getEnabledTasks = require('../util/getEnabledTasks')

// =======   
// Task Functionality: 
// We abstract our tasks to a named function so we can require the meeat & bones elsewhere if necessary
// ======= 
var watchTask = function() {
  var task_list = getEnabledTasks();
  var watchableTasks = [];
  for (var i = task_list.length - 1; i >= 0; i--) {
  	task_name = task_list[i];
	task = config[task_name]; 
  	if(task['watch_task']['enable'] === true) {
  		watchableTasks = watchableTasks.concat(task_name);
  	}
  }
// console.log(watchableTasks);
  watchableTasks.forEach(function(taskName) {
  	//console.log(taskName);
    var task = config[taskName];
    if(task) {
        var glob = task['watch_task']['src'];
        //console.log(task['watch_task']['src']);
        watch(glob, function() {
          console.log(taskName + " watch event");
          require('./' + taskName)()
        })
     }
  })
}
// =======   
// Task
// =======  
gulp.task('watch', /*['browserSync'],*/ watchTask)
module.exports = watchTask