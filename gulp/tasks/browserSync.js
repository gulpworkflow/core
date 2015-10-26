// BrowserSync for static build server and live reload
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml             = require('yamljs');
var global_config    = yaml.load('gulp/config.yml');
var config           = global_config.tasks.browserSync;
    config.name      = global_config.projectName;
// =======   
// Dependencies
// =======  
var gulp       = require('gulp');
var browserSync  = require('browser-sync');
// =======   
// Tasks:
// ======= 
gulp.task('browserSync', function() {
  if(config.enable_task) {	
	  browserSync.init(null, {
	    server: {
	      baseDir: config.server.baseDir,
	      index: config.server.index
	    },
	    open: "external",
	    logPrefix: config.name
	  });
  } else {
  	console.log('browserSync disabled via config.yml');
  }
});