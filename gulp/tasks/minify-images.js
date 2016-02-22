// Minimize Images
// -----------------------------------------------------
// =======
// Config Settings for Module
// =======
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml')['minify-images'];
// =======
// Dependencies
// =======
var changed      = require('gulp-changed');
var gulp         = require('gulp');
var imagemin     = require('gulp-imagemin');
var browserSync  = require('browser-sync');
var minimist     = require('minimist');
var watch_stream = require('gulp-watch');
var notify       = require('gulp-notify');
// =======
// Util:
// =======
// (work in progress)
/* we want to be able to pass src/dest directly to task via Command Line
   this is so that if you want to build process content images you can do it without
   having to move content images in/out of source folder (thereby gumming up the works)
*/
/*var knownOptions = {
  string: 'src',
  default: { src: config.src }
};*/

//var options = minimist(process.argv.slice(2), knownOptions);

// =======
// Task Functionality:
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// =======
/* if the task is enabled, let's minify each new image and put it both:
   (a) in the "minified" source folder (so we commit to version control & can compare with original source)
   (b) in the build folder so our webserver can access it
*/
var imagesMinify = function() {
    console.log('images');
    return gulp.src(config.src)
      .pipe(changed(config.dest)) // Ignore unchanged files
      .pipe(imagemin()) // Optimize
      .pipe(gulp.dest(config.dest))
      //.pipe(gulp.dest(config.dest.build))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({
          message: "Minified Image: <%= file.relative %>"
       }));
}

// =======
// Tasks:
// Create actual gulp task by name
// =======
gulp.task('minify-images', imagesMinify);
module.exports = imagesMinify;

