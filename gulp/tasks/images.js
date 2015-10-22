// Minimize Images
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').images;
// =======   
// Dependencies
// =======  
var changed    = require('gulp-changed');
var gulp       = require('gulp');
var imagemin   = require('gulp-imagemin');
var browserSync  = require('browser-sync');
// =======   
// Tasks:
// ======= 
gulp.task('images', function() {
  if(config.enable_task) {	
	  return gulp.src(config.src)
	    .pipe(changed(config.dest)) // Ignore unchanged files
	    .pipe(imagemin()) // Optimize
	    .pipe(gulp.dest(config.dest))
	    .pipe(browserSync.reload({stream:true}));
  } else {
  	console.log('image min disabled via config.yml');
  }
});
