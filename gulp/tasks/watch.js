/* Notes:
   - gulp/tasks/jspm.js handles js 
   - gulp/tasks/browserSync.js watches and reloads compiled files
*/

var gulp   = require('gulp');
var config = require('../config');
var watch  = require('gulp-watch');

gulp.task('watch', ['images', 'iconFont', 'scss', 'fonts', 'jspm'], function(callback) {
  watch(config.sass.src, function() { gulp.start('scss'); });
  watch(config.images.src, function() { gulp.start('images'); });
  watch(config.fonts.src, function() { gulp.start('fonts'); });
  watch(config.iconFont.src, function() { gulp.start('iconFont'); });
  watch('public/assets/**/*.js', function() { gulp.start('jspm'); });
});