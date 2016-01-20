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
var config       = yaml.load('src/config.yml').build_order;
var build       = yaml.load('src/config.yml').build;
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
var buildTask = function() {
  cleanOut.then(function () {
    buildProject();
  });
}

// =======
// Clean:
// delete all our previous build files, they're yesterday's news.  Its time to build again!
// =======
var clean = function() {
    cleanPaths = [];
    // loop through to extract all files we need to clean
    for (var srcset in config) {
      srcsetName = config[srcset]; // get the name of this thing, eg "Stylesheets"
      if(build[srcsetName] && build[srcsetName].clean !== false) { // make sure it exists and is cleaning is not disabled
        /*
        if clean is undefined (aka doesnt exist in config) or is null (left empty in config), that we use the default path
        which is the the destination.

        Otherwise use the clean path specified in the config
        */
        if(build[srcsetName].clean === undefined || build[srcsetName].clean === null) {
          thisPath =  build[srcsetName].dest;
        } else {
           thisPath = build[srcsetName].clean;
        }
        cleanPaths = cleanPaths.concat(thisPath); // add this path to our list of paths
      }
    }
    console.log(cleanPaths);
    return del(cleanPaths);
}
var cleanOut = clean();

// =======
// Build
// delete all our previous build files, they're yesterday's news.  Its time to build again!
// =======
var buildProject = function() {
  for (var buildset in config) {
    console.log(config[buildset]);
    buildSetName = config[buildset];
    console.log(build[buildSetName].src);
    console.log(build[buildSetName].dest);
    console.log(build[buildSetName].task);

  }
}

/* Set up our actual gulp tasks */
gulp.task('build', buildTask);
gulp.task('clean', clean);
