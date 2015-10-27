// Compile templates into HTML via Jade/Twig
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').tasks.jade;

// =======   
// Dependencies
// ======= 
var gulp         = require('gulp');
var jade         = require('gulp-jade');
var data         = require('gulp-data'); 
var browserSync  = require('browser-sync');
/*  var marked       = require('marked'); // For filter
    to-do: add markdown support */
var notify       = require("gulp-notify");     
// =======   
// Util Functions:
// ======= 
var handleErrors = require('../util/handleErrors');
var getTemplateData = require('../util/getTemplateData');
// =======   
// Task Functionality: 
// We abstract our tasks to a named function so we can require the meeat & bones elsewhere if necessary
// ======= 
var compileJade = function() {
   if(config.enable_task) {
      gulp.src(config.src)
      .pipe(data(function(file) {
        return getTemplateData(file,config.data_folderName);
      }))
      .pipe(jade({
        pretty: true
      }))
      .on('error', handleErrors)
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe( notify({
        title: "Jade Success",
          message: "<%= file.relative %> compiled"
      }));
  } else {
    gulp.src(config.src)
      .pipe(notify({
        title: 'Jade template not compiled',
        message: 'jade disabled by config.yml',
        sound: true // Only Notification Center or Windows Toasters
      }));
  }
}
// =======   
// Tasks:
// ======= 
gulp.task('jade', compileJade);
module.exports = compileJade;

