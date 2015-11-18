// Production
// Clean our production, move our build system, call asset pipeline
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml            = require('yamljs');
var config          = yaml.load('src/config.yml').production;
// =======   
// Dependencies
// =======
var gulp            = require('gulp')
var runSequence     = require('run-sequence');
var del             = require('del');
var notify          = require('gulp-notify');

var handleErrors     = require('../../util/handleErrors');
// =======   
// Task functionality
// =======
var productionTask = function(cb) {
  //var tasks = getEnabledTasks('production')
  runSequence('production:clean', 'production:move', /*'asset_pipeline',*/ cb)
}
// =======   
// Task
// =======
gulp.task('production', productionTask);
module.exports = productionTask;
 
gulp.task('production:clean', function(){
   console.log(config.dest);
   del(config.dest)
})

gulp.task('production:move', function(){
	src = config.src + '/**/*';
 return gulp.src(src, {base:config.src})
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest))
    .pipe( notify({
          message: "Moved project to dist"
        }));
    
})