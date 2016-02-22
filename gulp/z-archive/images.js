// Minimize Images
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml').tasks.images;
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
var knownOptions = {
  string: 'src',
  default: { src: config.src }
};

var options = minimist(process.argv.slice(2), knownOptions);

// =======   
// Task Functionality: 
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// ======= 
/* if the task is enabled, let's minify each new image and put it both:
   (a) in the "minified" source folder (so we commit to version control & can compare with original source)
   (b) in the build folder so our webserver can access it 
*/
var imagesMinify = function() {
  if(config.enable_task) {  
    console.log(options.src)
    return gulp.src(options.src)
      .pipe(changed(config.dest.src)) // Ignore unchanged files
      .pipe(imagemin()) // Optimize
      .pipe(gulp.dest(config.dest.src))
      .pipe(gulp.dest(config.dest.build))
      .pipe(browserSync.reload({stream:true}))
      .pipe(notify({
          message: "Minified Image: <%= file.relative %>"
       }));
  } else {
    console.log('image min disabled via config.yml');
  }
}

// =======   
// Tasks:
// Create actual gulp task by name
// ======= 
gulp.task('images', imagesMinify);
module.exports = imagesMinify;



/* We don't want to continually re-minify our images each time gulp runs (which will slow everything way down).
   So, images are only minified on a transactional basis – one at a time, when they are added for first time (task 'images')
   The minified images are still stored in the 'source' folder (so we commit to version control & can compare with original source). 
   That means when we start gulp for the first time, we just simply move the minified version of images from "source" to "build".  
*/
gulp.task('images:move', function() {
  // the minified image destination is just a folder, so we need to append a glob string so it will pull the actual image files
  if(config.dest.src.slice(-1) === '/') {
    minified_source_images = config.dest.src + '**';
  } else {
    minified_source_images = config.dest.src + '/**';
  }
  // just move the images, nothing else! (they're already minified)
  return gulp.src(minified_source_images)
    .pipe(gulp.dest(config.dest.build));
});
