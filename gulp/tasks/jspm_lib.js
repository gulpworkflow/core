// Javascripts
// -----------------------------------------------------
// Process your hypertext (HTML/PHP) from src to build

// =======   
// Config Settings for Module
// =======
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').tasks.jspm_lib; 
// =======   
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var browserSync  = require('browser-sync'); 
// =======   
// Tasks:
// ======= 
// move application javascript to the jspm lib folder when they change
gulp.task('jspm_lib', function () {
   if(config.enable_task) { 
   	 return gulp.src(config.src)
   	   .pipe(changed(config.dest.build)) // Ignore unchanged files
   	   .pipe(gulp.dest(config.dest.build))
	   .pipe(browserSync.reload({stream:true}));
   } else {
        console.log('jspm lib move disabled via config.yml');
    }
});
