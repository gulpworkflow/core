// Compile templates into HTML via Jade/Twig
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').templates;
// =======   
// Dependencies
// ======= 
var gulp         = require('gulp');
var jade         = require('gulp-jade');
var twig         = require('gulp-twig');
var marked       = require('marked'); // For :markdown filter in jade
var data         = require('gulp-data'); 
var browserSync  = require('browser-sync');
var path         = require('path');
// =======   
// Tasks:
// ======= 
gulp.task('compile-templates', function() {
  // No template engine
  if(config.engine === false) { 
   	return false;  // If the template engine is false, than its just HTML no templates
  }
  // Jade
  else if(config.engine === 'jade') {
    gulp.src(config.jade.src)
    .pipe(data(getJsonData()))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.jade.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
  }
  // Twig 
  else if(config.engine === 'twig') { 
  	gulp.src(config.twig.src)
  	.pipe(data(function(file) {
  	  extName = path.extname(file.path)
      return require(config.twig.data + '/' + path.basename(file.path, extName) + '.json');
    }))
    .pipe(twig())
    .pipe(gulp.dest(config.twig.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
  }
});

