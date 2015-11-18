// Fonts
// -----------------------------------------------------
// Process your hypertext (HTML/PHP) from src to build

// =======   
// Config Settings for Module
// ======= 
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml').tasks.fonts;
// =======   
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var addSrc       = require('gulp-add-src');
var concat       = require('gulp-concat-util');
var browserSync  = require('browser-sync');
var notify       = require("gulp-notify"); 
var replace      = require('gulp-replace'); //Added variable for gulp-replace
var merge        = require('merge-stream');
// =======   
// Task Functionality: 
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// ======= 
var combineFontCSS = function() {
  if(config.enable_task) { 
  	// font style sheets
  	var styles = gulp.src(config.stylesheets.src)
  	    .pipe(concat(config.stylesheets.outputFile)) //Concat them all into a single file
		.pipe(concat.header('/* !!! WARNING !!! \nThis file is auto-generated. \nDo not edit it or else you will lose changes! */\n\n'))
		.pipe(replace("url('", "url('" + config.stylesheets.fontLocation))
		.pipe(gulp.dest(config.stylesheets.outputPath)); 
	// font files
	var fontFiles = gulp.src(config.fontFiles.src) //Gather up all the 'stylesheet.css' files
	     .pipe(changed(config.fontFiles.dest)) // Ignore unchanged files
	     .pipe(gulp.dest(config.fontFiles.dest)) //
	     .pipe(addSrc(config.stylesheets.src));
	return merge(styles, fontFiles);     
 }
}
gulp.task('fonts', combineFontCSS);
module.exports = combineFontCSS;