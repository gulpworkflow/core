// Hypertext
// -----------------------------------------------------
// Process your hypertext (HTML/PHP) from src to build

// =======   
// Config Settings for Module
// ======= 
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').tasks.hypertext; 
// =======   
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var browserSync  = require('browser-sync');
var notify       = require("gulp-notify"); 
// =======   
// Task Functionality: 
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// ======= 
var processHypertext = function() {
  if(config.enable_task) { 
   	 return gulp.src(config.src)
   	   .pipe(changed(config.dest)) // Ignore unchanged files
   	   .pipe(gulp.dest(config.dest))
	   .pipe(browserSync.reload({stream:true}))
	   .pipe( notify({
          message: "Added build file: <%= file.relative %>"
        }));
   } else {
        console.log('hypertext disabled via config.yml');
    }
}
// =======   
// Tasks:
// ======= 
gulp.task('hypertext', processHypertext);
module.exports = processHypertext;
