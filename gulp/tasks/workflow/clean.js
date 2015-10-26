// Clean
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('gulp/config.yml');
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');
// =======   
// Util functions
// =======  
var getEnabledTasks = require('../../util/getEnabledTasks')
// =======   
// Tasks
// =======
// Clean out the "build" folder - we do this before we build all source
// files into a locally served environment for building. 
gulp.task('clean:build', function () {

});
// Clean out the "dist" folder - we do this before packaging up our project
// for distribution on a production environment
gulp.task('clean:dist', function () {

});