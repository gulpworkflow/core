// Generate Icon Font
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml             = require('yamljs');
var global_config    = yaml.load('gulp/config.yml');
var config           = global_config.tasks.iconFont;
config.name          = global_config.projectName;
// =======   
// Dependencies
// =======
var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var iconfontCss      = require('gulp-iconfont-css');
var notify           = require("gulp-notify");
var handleErrors     = require('../../util/handleErrors');
// =======   
// Tasks:
// ======= 
var runTimestamp     = Math.round(Date.now()/1000);
var fontName         = config.name+'-icons';

gulp.task('iconFont', function(){
if(config.enable_task) {  
  gulp.src([config.src],{base: config.base})
    .pipe(iconfontCss({
      fontName: fontName,
      path: config.template,
      targetPath: config.sassOutput,
      fontPath: config.fontPath,
      className: config.className
    }))
    .pipe(iconfont({
      fontName: fontName,
      appendUnicode: false, 
      formats: ['ttf', 'eot', 'woff','woff2','svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp // recommended to get consistent builds when watching files
     }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.fontDest));
    
  } else {
    console.log('iconfont creation disabled via config.yml');
  }
});