// Generate favicons
// -----------------------------------------------------
// =======   

// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('src/config.yml').tasks.favicon;
// =======   
// Dependencies
// =======
var gulp       = require('gulp');
var through    = require('through2');
var favicons   = require('gulp-favicons');
var notify     = require("gulp-notify");
var del        = require('del')
// =======   
// Task Functionality: 
// We abstract our tasks to a named function so we can require the meeat & bones elsewhere if necessary
// ======= 
var generateFavicon = function() {
  if(config.enable_task) {  
     gulp.src('src/favicon/favicon-1024x1024.png')
        .pipe(favicons({
            files: {
                html: 'src/favicon/output/favicon.html'
            },
            icons: {
              android: true,            // Create Android homescreen icon. `boolean`
              appleIcon: true,          // Create Apple touch icons. `boolean`
              appleStartup: false,       // Create Apple startup images. `boolean`
              coast: false,              // Create Opera Coast icon. `boolean`
              favicons: true,           // Create regular favicons. `boolean`
              firefox: true,            // Create Firefox OS icons. `boolean`
              opengraph: false,          // Create Facebook OpenGraph. `boolean`
              windows: true,            // Create Windows 8 tiles. `boolean`
              yandex: false              // Create Yandex browser icon. `boolean`
            },
            settings: { background: '#ffffff' , vinylMode: true }
        }, function(code) {
            console.log(code);
        }))
        .pipe(through.obj(function (file, enc, cb) {
            console.log(file.path);
            this.push(file);
            cb();
        }))
        .pipe(gulp.dest('src/favicon/output'))
        .pipe( notify({
          title: "Favicon Generated",
          message: "Generated favicon"
        }));
    }
}    
// =======   
// Tasks:
// =======
gulp.task('favicon', generateFavicon);
module.exports = generateFavicon;

gulp.task('favicon:move', function(){
  console.log('move favicons');
});

gulp.task('clean:favicon', function(){
  del(config.dest).then(function(){
    console.log('favicons deleted from ' + config.dest);
  });
});