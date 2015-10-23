// Default task
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('gulp/config.yml').tasks;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var getEnabledTasks = require('../util/getEnabledTasks')


// First check each task and create a dynamic object of enabled tasks
// Each task has a boolean "enable_task" setting in the config.yml file 
// These tasks will be run initially before the watch tasks kick in
task_list = getEnabledTasks();


gulp.task('default', task_list, function() {
	// Loop through all the enabled tasks and create a watch task (if that is enabled)
	for (var i = task_list.length - 1; i >= 0; i--) {
		task_name = task_list[i];
		task = config[task_name]; 
		// check if the task should have a watch task
		if(task['watch_task']['enable'] === true) {
		    console.log(task_name);
			src = task['watch_task']['src']; // set which files we watch for changes
		    gulp.watch(src, [task_name]);
		}
	};	
});