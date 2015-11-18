// Default task
// -----------------------------------------------------
'use strict';
// =======   
// Config Settings for Module
// =======  
var yaml               = require('yamljs');
var default_task_list  = yaml.load('src/config.yml').default_build_order;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var runSequence     = require('run-sequence');

var defaultTask = function() {
  // apply the default tasks as the arguement for run-sequence
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply
  runSequence.apply(null, default_task_list);
}

gulp.task('default', defaultTask);
module.exports = defaultTask;