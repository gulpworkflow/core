// Javascripts
// -----------------------------------------------------
// Process your hypertext (HTML/PHP) from src to build

// =======   
// Config Settings for Module
// =======
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml').tasks.jspm_lib;
var bundle       = yaml.load('src/config.yml').tasks.jspm_bundle;
// =======   
// Dependencies
// =======
var gulp         = require('gulp');
var changed      = require('gulp-changed');
var browserSync  = require('browser-sync');
var notify       = require('gulp-notify'); 
var jspm         = require('jspm');
// =======   
// Task Functionality: 
// We abstract our tasks to a named function so we can require the meeat & bones elsewhere if necessary
// ======= 
var moveJSPMlib = function() {
	if(config.enable_task) { 
   	 return gulp.src(config.src)
   	   .pipe(changed(config.dest.build)) // Ignore unchanged files
   	   .pipe(gulp.dest(config.dest.build))
	   .pipe(browserSync.reload({stream:true}))
	   .pipe( notify({
	   	  title: "Javascript Success",
          message: "JSPM lib <%= file.relative %> move complete"
        }));
   } else {
        console.log('jspm lib move disabled via config.yml');
   }
}

var bundleJSPM = function() {
  if(bundle.enable_task) { 
     gulp.src(['build/js/jspm_packages/*.js', 'build/js/jspm_packages/*.js.map'])
      .pipe(changed('build/js/jspm_packages/')) // Ignore unchanged files
      .pipe(gulp.dest('build/js/jspm_packages/'))

     gulp.src(['build/js/config.js'])
      .pipe(changed('build/js/'))
      .pipe(gulp.dest('build/js/'));

    return jspm.bundleSFX('lib/main',  'build/js/build.js',
      {
        sourceMaps: true,
        // sourceMapContents: true,
        // mangle: false,
        // minify: true,
        // lowResSourceMaps: false,
      });
  }
}
// =======   
// Tasks:
// ======= 
// move application javascript to the jspm lib folder when they change
gulp.task('jspm_lib', moveJSPMlib);
module.exports = moveJSPMlib;

gulp.task('jspm_bundle', bundleJSPM);