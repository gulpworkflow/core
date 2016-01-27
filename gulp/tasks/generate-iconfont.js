// Generate Icon Font
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml             = require('yamljs');
var global_config    = yaml.load('src/config.yml');
var config           = global_config['generate-iconfont'];
    config.name      = global_config.projectName;
// =======   
// Dependencies
// =======
var gulp             = require('gulp');
var iconfont         = require('gulp-iconfont');
var iconfontCss      = require('gulp-iconfont-css');
var notify           = require("gulp-notify");
var handleErrors     = require('../util/handleErrors');

// =======   
// Task Functionality: 
// We abstract our tasks to functions so we can require the meeat & bones elsewhere if necessary
// ======= 
var generateIconFont = function() {
  var runTimestamp     = Math.round(Date.now()/1000);
  var fontName         = config.name+'-icons';
  //console.log(config.src);
  gulp.src([config.src],{base: config.base})
    .pipe(iconfontCss({
      fontName: fontName,                // The name of the generated font family (required). Has to be identical to iconfont's fontName option.
      path: config.template,             // The template path for stylesheet (we use scss)   
      targetPath: config.sassOutput,     // The path where the (S)CSS file should be saved, relative to the path used in gulp.dest() 
                                         // Depending on the path, it might be necessary to set the base option, see https://github.com/backflip/gulp-iconfont-css/issues/16. 
      fontPath: config.fontPath,         // Directory of font files relative to generated (S)CSS file (optional, defaults to ./)
      className: config.className        // Name of the generated CSS class/placeholder. Used for mixins and functions, too
    }))
    .pipe(iconfont({
      fontName: fontName,
      appendUnicode: false, 
      formats: ['ttf', 'eot', 'woff','woff2','svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp // recommended to get consistent builds when watching files
     }))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.fontDest))
    .pipe( notify({
          title: "Icon font built",
          message: "Generated icon font: " + fontName
        }));
}

// =======   
// Tasks:
// ======= 
gulp.task('generate-iconfont', generateIconFont);
module.exports = generateIconFont;