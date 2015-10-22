// Generate Icon Font
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml             = require('yamljs');
var global_config    = yaml.load('gulp/config.yml');
var config           = global_config.iconFont;
config.name          = global_config.projectName;
// =======   
// Dependencies
// =======
var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var iconfontCss      = require('gulp-iconfont-css');
// =======   
// Tasks:
// ======= 
var runTimestamp     = Math.round(Date.now()/1000);
var fontName         = config.name+'-icons';

gulp.task('iconfont', function(){
  gulp.src([config.src],{base: '../src'})
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
    .pipe(gulp.dest(config.fontDest));
});