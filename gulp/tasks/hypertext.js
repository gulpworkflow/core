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
// =======   
// Tasks:
// ======= 
gulp.task('hypertext', function () {
   if(config.enable_task) { 
   	 return gulp.src(config.src)
   	   .pipe(changed(config.dest)) // Ignore unchanged files
   	   .pipe(gulp.dest(config.dest))
	   .pipe(browserSync.reload({stream:true}));
   } else {
        console.log('hypertext disabled via config.yml');
    }
});
