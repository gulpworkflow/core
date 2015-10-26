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
// Task
// =======  
// First check each task and create a dynamic object of enabled tasks
// Each task has a boolean "enable_task" setting in the config.yml file 
// These tasks will be run initially before the watch tasks kick in


/*gulp.task('watch', function() {
	// Loop through all the enabled tasks and create a watch task (if that is enabled)
	
	//console.log('done!');
});*/
gulp.task('watch', function() {
	task_list = getEnabledTasks();
	console.log(task_list);
	// Loop through all the enabled tasks and create a watch task (if that is enabled)
	for (var i = task_list.length - 1; i >= 0; i--) {
		task_name = task_list[i];
		task = config[task_name]; 
		// check if the task should have a watch task
		if(task['watch_task']['enable'] === true) {
		    //console.log(task_name);
			src = task['watch_task']['src']; // set which files we watch for changes
		   // gulp.watch(src, [task_name]);
		   console.log(src);
		   watch(src, function() {
		   	console.log('sdf');
		   	 require('./' + task_name)();
	       //require('./' + taskName)()
	      });
		}
	};	
	//console.log('done!');
});