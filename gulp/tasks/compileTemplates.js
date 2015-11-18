// Compile templates into HTML via Jade/Twig
// -----------------------------------------------------
// =======
// Config Settings for Module
// =======
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml').tasks.compileTemplates;

// =======
// Dependencies
// =======
var gulp         = require('gulp');
var twig         = require('gulp-twig');
var data         = require('gulp-data');
var browserSync  = require('browser-sync');
var notify       = require('gulp-notify');
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
var compileTemplates = function() {
  //console.log(config);
  if(config.enable_task) {
    gulp.src(config.src)
      .pipe(data(function(file) {
        return getTemplateData(file,config.data_folderName);
      }))
      .pipe(twig())
      .on('error', handleErrors)
      .pipe(gulp.dest(config.dest))
      .pipe(browserSync.reload({
        stream: true
      }))
      .pipe( notify({
        title: "Twig Success",
          message: "<%= file.relative %> compiled"
        }));
  } else {
    gulp.src(config.src)
      .pipe(notify({
        title: 'Twig template not compiled',
        message: 'twig disabled by config.yml',
        sound: true // Only Notification Center or Windows Toasters
      }));
  }
}
// =======
// Tasks:
// =======
gulp.task('compileTemplates', compileTemplates);
module.exports = compileTemplates;
