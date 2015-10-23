// Default task
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('gulp/config.yml').tasks;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');
// =======   
// Util functions
// =======  
var getEnabledTasks = require('../../util/getEnabledTasks')

gulp.task('clean', function () {

});