
// -----------------------------------------------------
// WORKFLOW -- "BUILD" PHASE
// -----------------------------------------------------
/* 
*/

// =======
// Config Settings for Module
// =======
var yaml          = require('yamljs');
var config        = yaml.load('src/config.yml');
var build_order   = config['build-order'];
var build         = config['build-steps'];
//var moveFiles      = require('move');
// =======
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var browserSync  = require('browser-sync');
var notify       = require("gulp-notify");
var runSequence  = require('run-sequence');
var gulpWatch    = require('gulp-watch');
var concat       = require('gulp-concat-util');
var gulpif       = require('gulp-if');
var notify       = require('gulp-notify');
var del          = require('del');
var ncp          = require('ncp').ncp;
var isGlob       = require('is-glob');
var path         = require('path');

// =======
// Task Functionality:
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// =======
var buildChain = function() {
  cleanOut  // clean
    .then(function () {
      buildProject(); // build
    })
    .then(function() {
      serveProject();
    })
    .then(function(){
      watchForChanges(); // watch
    });;
}

// =========================================================================================================================
// Clean Out the Build folder:
// delete all our previous build files, they're yesterday's news.  Its time to build again!
// =======
var clean = function() {
    cleanPaths = [];
    // loop through to extract all files we need to clean
    for (var i in build_order) {
      name   = build_order[i]; // get the name of this thing, eg "Stylesheets"
      move   = build[name]['move'];
      tasks  = build[name].tasks;
      
      if(move && move.clean !== false){ // do nothing if "clean" is set to false
        if(move.clean === undefined || move.clean === null) {
          if(move.to) { cleanPaths = cleanPaths.concat(move.to); }
        } else {
          cleanPaths = cleanPaths.concat(move.clean);
        }
      } 

      if(tasks) {
        for (i in tasks) {
          task = config[tasks[i]];
          if(task.clean !== false) { // do nothing if "clean" is set to false
            if(task.clean === undefined || task.clean === null) {
              if(task.dest) { cleanPaths = cleanPaths.concat(task.dest); }
            } else {
              cleanPaths = cleanPaths.concat(task.clean);
            }
            //cleanPaths = cleanPaths.concat(task.clean);
          } 
        }
      }
    }
    //console.log(cleanPaths);
    return del(cleanPaths);
}
var cleanOut = clean();

// =========================================================================================================================
// "The Build"
// Loop through each step: run any necessary tasks in sequence, than move files if the build steps calls for it. 
// =======
var buildProject = function() {
  //console.log('build!');
  for (var i in build_order) {
    name         = build_order[i];
    tasks        = build[name].tasks;
    move         = build[name].move;

    if(tasks) {
      // if there are tasks, run the them in sequence, than move files as afterwards (callback)
      runSequence(tasks, function(move){
        if(move) {
          moveFiles(move.from,move.to);
          //console.log(move.to + ': ' + eval(path.extname(move.to)));
          //console.log(move.to);
          //console.log(path.extname(move.to));
        }
      });
    } else if (move) {
      moveFiles(move.from,move.to);
      //console.log(move.to + ': ' + eval(path.extname(move.to)));
      //console.log(move.to);
    }
  }
}

// =========================================================================================================================
// Move Files
// the ability to move files is a core part of the workflow's build step.  Here are the functions to move the files and watch
// for changes.
// =======
// move them inititally
var moveFiles = function(from,to) {
  fileExt = path.extname(to);
  if(fileExt === "") {
    //console.log('directory'); 
    dirName = to;
  } else {
   // console.log('file');
    shouldConcat = true;
    dirName = path.dirname(to);
    fileName = path.basename(to);
  }


  if (isGlob(from)) {
   // console.log(from + 'is a glob');
    return gulp.src(from)
      //.pipe(concat('combined.js'))
      .pipe(gulpif(shouldConcat, concat(fileName)))
      .pipe(gulp.dest(dirName));
      //.pipe(gulpif(shouldConcat, concat('combined.js')));
  } else {
    ncp(from, to, function (err) {
     if (err) {
       return console.error(err);
     }
     //console.log('Completed moving ' + from);
    });
  }
}

// watch for changes to move them
var moveFilesWatch = function(src,dest) {
  for (var i in build_order) {

    watchThis    = null;
    name         = build_order[i];
    move         = build[name].move;
    watch        = build[name].watch;

    // make sure the "move" property is actually set
    if(move !== undefined) {

       // Set the watch files. 
       // if Watch is false than don't watch, skip it
       // if watch is not set or null that we use the "move: to;""
      if(move.watch !== false) {
        if(move.watch === null || move.watch === undefined) {
          if(move.from) { watchThis = move.from; }
        } else {
          watchThis = move.watch;
        }
      } 

      // Determine if the watched file should be concat or just simply moved 
      // this is tested later based on "shouldConcat"
      fileExt = path.extname(move.to);
      if(fileExt === "") {
        shouldConcat = false;
        dirName      = move.to;
        fileName     = undefined;
      } else {
        shouldConcat = true;
        dirName      = path.dirname(move.to);
        fileName     = path.basename(move.to);
      }
      
      if(watchThis) {

        // go through and set the actual watch src string so it matches our glob requirements:
        // it needs to be a glob - eg /** or /*.js
        if(typeof(watchThis) === 'object') {
          for (ii in watchThis) {
            if(isGlob(watchThis[ii]) === false) {
              if(watchThis[ii].slice(-1) === "/") { 
                watchThis[ii] = watchThis[ii] + "**"; 
              } else {
                watchThis[ii] = watchThis[ii] + "/**";
              }
            }
          }
        } else if(typeof(watchThis) === 'string') {
          if(isGlob(watchThis) === false) {
            if(watchThis.slice(-1) === "/") { 
              watchThis = watchThis + "**"; 
            } else {
              watchThis = watchThis + "/**";
            }
          }
        }

        // run watch task for each
        (function(watchThis,shouldConcat,dirName,fileName, name) { 
          gulpWatch(watchThis, function() {
            //console.log('Should Concat? ' + shouldConcat);
            //console.log('filename: ' + fileName);
            //console.log(watchThis + " to: " + dirName);
            return gulp.src(watchThis)
              .pipe(gulpif(shouldConcat === false, changed(dirName)))
              .pipe(gulpif(shouldConcat, concat(fileName)))
              .pipe(gulp.dest(dirName))
              .pipe( notify({
                  message: "Processed a move for: " + name
                }));
          });
        })(watchThis,shouldConcat,dirName,fileName, name);
      }
    }
  }  
}

// =========================================================================================================================
// Watch for changes
// =======
var watchForChanges = function() {
  //console.log('hey');
  var watchConfig = Array();
  for (var i in build_order) {
    name         = build_order[i];
    tasks        = build[name].tasks;
    watch        = build[name].watch;

    // determine which task files should be watched
    for (var ii in tasks) {
      theFiles = null; // clear out theFiles. This is an iterative working variable
      taskName   = tasks[ii];
      watchFiles = config[tasks[ii]].watch;
      srcFiles   = config[tasks[ii]].src;

      // make sure watching isn't explicityl disabled
      if(watchFiles !== false) {
        if(watchFiles === null || watchFiles === undefined) {
         // watching the source by default because watch is not set
         if (srcFiles) {
            theFiles = srcFiles;
          }
        } else {
          // watch is set, so lets watch those files
          theFiles = watchFiles;
        }  
      }
      
      // if there are files to watch then we add this 
      if(theFiles) {
        watchConfig.push({
          task: taskName,
          files: theFiles
        });
      }
    }
  }

  // watch for changes amongst all the enabled tasks
  watchConfig.forEach(function(watchThis) {
    //console.log('watch: ' + watchThis.files + ' and run: ' + watchThis.task);
    gulpWatch(watchThis.files, function () {
      console.log(watchThis.task + " watch event");
      require('./' + watchThis.task)()
    });
  });

  // watch for changes amongst all the moved files
  moveFilesWatch();
}

var serveProject = function() {
  runSequence('browserSync');
}

// =========================================================================================================================
// Gulp Tasks
// =======
gulp.task('build', buildChain);
gulp.task('build-clean', clean);
gulp.task('watch', watchForChanges);
