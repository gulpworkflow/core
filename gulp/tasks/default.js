// Default task
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml               = require('yamljs');
var default_task_list  = yaml.load('gulp/config.yml').default_build_order;
// =======   
// Dependencies
// =======  
var gulp            = require('gulp');
var gulpSequence    = require('gulp-sequence');
//var getEnabledTasks = require('../../util/getEnabledTasks')


// First check each task and create a dynamic object of enabled tasks
// Each task has a boolean "enable_task" setting in the config.yml file 
// These tasks will be run initially before the watch tasks kick in
//task_list = getEnabledTasks();
//default_task_list = JSON.stringify(default_task_list).substr(1,JSON.stringify(default_task_list).length-2);
//default_task_list = default_task_list.replace(/"/g, "'");
//default_task_list = JSON.parse(_default_task_list);
//default_task_list = default_task_list.escapeSpecialChars();
//thetype = typeof default_task_list;
//console.log(thetype);
gulp.task('default', gulpSequence('clean:build', 'images:move', ['iconFont', 'favicon'], ['twig', 'nunjucks', 'jade'],  ['jspm_lib', 'sass'], 'hypertext', 'watch', 'browserSync'));
//gulp.task('default', gulpSequence(default_task_list));