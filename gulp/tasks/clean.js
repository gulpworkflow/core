// Clean
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
var path            = require('path')
var del             = require('del')
// =======   
// Util functions
// =======  
var getEnabledTasks = require('../util/getEnabledTasks')
// =======   
// Tasks
// =======
// Clean out the "build" folder - we do this before we build all source
// files into a locally served environment for building. 
task_list = getEnabledTasks();

gulp.task('clean:build', function () {
   var cleanFiles = [];	
   for (var i = task_list.length - 1; i >= 0; i--) {
		task_name = task_list[i];
		task = config[task_name]; 
		src = task['clean']; // set which files are cleaned out
		if(src) {
		    //console.log(task_name);
		  src = task['clean']; // set which files are cleaned out
		  //console.log(src);
		  cleanFiles = cleanFiles.concat(src);
		    //cleanFiles = path.join(cleanFiles, src);
		}
	};	
  del(cleanFiles).then(function (paths) {
    //console.log('Deleted files/folders:\n', paths.join('\n'));
  });

});
// Clean out the "dist" folder - we do this before packaging up our project
// for distribution on a production environment
gulp.task('clean:dist', function () {

});