// Watch Files
// -----------------------------------------------------
/* THIS IS NOT THE WORKFLOW BUILD TASK!!!
   --------
   This is a task that watches an arbitrary set of files and moves them
   from source to build.  It can also concat them.

   The purpose of this is to help keep source code organized very neatly.
   You can organize your files without being limited by the ultimate folder structure
*/

// =======
// Config Settings for Module
// =======
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml');
// =======
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var browserSync  = require('browser-sync');
var notify       = require("gulp-notify");
var runSequence  = require('run-sequence');
var watch        = require('gulp-watch');
var concat       = require('gulp-concat-util');
var gulpif       = require('gulp-if');
var notify       = require('gulp-notify');
var del          = require('del');
var ncp          = require('ncp').ncp;

// =======
// Task Functionality:
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// =======
ncp.limit = 16;

var watchFiles = function() {
  taskSequence = [];
  for (var globName in config) {
      if(config[globName]["enable_task"] === true) {
         // all this globa to the task sequence
        taskSequence = taskSequence.concat(globName);
        // create a a task for this file batch
        //console.log(globName);

        (function(globName) { // use an anonymous function to keep the reference to current glob
                              // http://bonsaiden.github.io/JavaScript-Garden/#function.closures
                              // See 'closures inside loops' and 'avoiding reference problem'
          gulp.task(globName, function(){
            /*return gulp.src(config[globName]['src'])
              .pipe(changed(config[globName]['dest'])) // Ignore unchanged files
              .pipe(gulpif(config[globName]["concat"], concat(config[globName]["fileName"])))
              .pipe(gulp.dest(config[globName]['dest']))
              .pipe(browserSync.reload({stream:true}))
              .pipe( notify({
                message: "Processed " + globName
              }));*/
            ncp(config[globName]['src'], config[globName]['dest'], function (err) {
             if (err) {
               return console.error(err);
             }
             console.log('Completed moving ' + globName);
            });
          })
        })(globName);

      }
 }
 runSequence(taskSequence);
}
gulp.task('watchFiles', watchFiles);

// Set up watch tasks
module.exports = {
  watch: function() {
    for (var globName in config) {
        if(config[globName]["enable_task"] === true) {
          (function(globName) { // use an anonymous function to keep the reference to current glob
                                // http://bonsaiden.github.io/JavaScript-Garden/#function.closures
                                // See 'closures inside loops' and 'avoiding reference problem'
            watch(config[globName]["src"], function() {
                console.log(globName + " changed");
              return gulp.src(config[globName]['src'])
               .pipe(changed(config[globName]['dest'])) // Ignore unchanged files
               .pipe(gulpif(config[globName]["concat"], concat(config[globName]["fileName"])))
               .pipe(gulp.dest(config[globName]['dest']))
               .pipe(browserSync.reload({stream:true}))
               .pipe( notify({
                  message: "Processed " + globName
                }));
            })
          })(globName);
        }
    }
  },
  clean: function() {
    for (var globName in config) {
        if(config[globName]["enable_task"] === true) {
          (function(globName) { // use an anonymous function to keep the reference to current glob
                                // http://bonsaiden.github.io/JavaScript-Garden/#function.closures
                                // See 'closures inside loops' and 'avoiding reference problem'
            //console.log(config[globName]["clean"])
            return del(config[globName]["clean"])
          })(globName)
        }
    }
  }
}
