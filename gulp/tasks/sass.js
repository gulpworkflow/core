// Process SASS into CSS
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').tasks.sass;
// =======   
// Dependencies
// =======  
var gulp         = require('gulp');
var plumber      = require('gulp-plumber');
var browserSync  = require('browser-sync');
var sass         = require('gulp-sass');
var sourcemaps   = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var autoprefixer = require('gulp-autoprefixer');
var bulkSass     = require('gulp-sass-bulk-import');
var cssbeautify  = require('gulp-cssbeautify');
var notify       = require('gulp-notify');
var through      = require('gulp-through');
// =======   
// Tasks:
// ======= 
gulp.task('sass', function () {
   if(config.enable_task) {   
      return gulp.src(config.src)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(bulkSass()) // allows for eg - '@import modules/**/*' 
        .pipe(sourcemaps.init())
        .pipe(sass(config.settings))
        .on('error', handleErrors)
        .pipe(cssbeautify()) // we're beautifying the CSS so that when we import in into StyleStrap it is readable
        .pipe(autoprefixer({ browsers: config.autoprefix_browsers }))
        .pipe(sourcemaps.write('./')) // write sourcemaps to external file
        .pipe(gulp.dest(config.dest))
        .pipe(browserSync.reload({stream:true}));
    } else {
        console.log('sass processing disabled via config.yml');
    }
});
