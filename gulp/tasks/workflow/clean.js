// Clean
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('src/config.yml').tasks;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var path            = require('path');
var del             = require('del');
var notify          = require('gulp-notify');
// =======   
// Util functions
// =======  
var getEnabledTasks = require('../../util/getEnabledTasks')
// =======   
// Tasks functionality
// =======
// Clean out the "build" folder - we do this before we build all source
// files into a locally served environment for building. 
var cleanBuildFolder = function() {
   task_list = getEnabledTasks();
   var cleanFiles = [];	

   // loop through all tasks and create an object of files to delete
   for (var i = task_list.length - 1; i >= 0; i--) {
		task_name = task_list[i];
		task = config[task_name]; 
		src = task['clean']; // set which files are cleaned out
		if(src) {
		  //console.log(task_name);
		  src = task['clean']; // set which files are cleaned out
		  cleanFiles = cleanFiles.concat(src);
		}
	};
  // clean out task built files
  del(cleanFiles).then(function(paths) {
  	if(paths != '') {
	  console.log('Cleaned out the following files: ' + paths);
    }
  });
  // clean out "watch files"
  require('../watchfiles').clean()

}
// =======   
// Tasks
// =======
gulp.task('clean', cleanBuildFolder);
// Clean out the "dist" folder - we do this before packaging up our project
// for distribution on a production environment


module.exports = cleanBuildFolder;