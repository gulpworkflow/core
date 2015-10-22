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
// Util Functions:
// ======= 
// Get data (JSON) for the templates
// -----
// json files *must* have the same name as the template file to pipe into the template
// eg - "page.twig" will automatically be populated by data in "page.json"
// define the folder (relative to templates) in config.yml
var getTemplateData = function(file,data_folderName) {
  template_data_dirname = path.dirname(file.path) + '/' + data_folderName;
  template_data_extName = path.extname(file.path)
  template_data_filename = path.basename(file.path, template_data_extName) + '.json'
  template_data_filePath = template_data_dirname + "/" + template_data_filename;
  template_data = require(template_data_filePath);
  console.log(template_data);
  return template_data;
}
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
    .pipe(data(function(file) {
      return getTemplateData(file,config.jade.data_folderName);
      //console.log('sdf' + getTemplateData(file,config.jade.data_folderName))
    }))
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
      return getTemplateData(file,config.twig.data_folderName);
    }))
    .pipe(twig())
    .pipe(gulp.dest(config.twig.dest))
    .pipe(browserSync.reload({
      stream: true
    }));
  }
});

