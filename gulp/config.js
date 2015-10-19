// -----------------------------------------------------------------------------
// Editable Configs
// -----------------------------------------------------------------------------
//  project name 
var clientName    = 'hello-world';
// -------
//  core file paths
var sourceFiles   = '../src'; 
var publicAssets  = '../dist'; // Change if your build location is different
// -------
//  Enter 'twig', 'jade', or 'false' if you are writing HTML directly  
var templateEngine = 'twig'; 
                    //'jade'
                    // false
                    
// -----------------------------------------------------------------------------
// Whats this purpose??
// -----------------------------------------------------------------------------
var exec = require('child_process').execSync;

// -----------------------------------------------------------------------------
// File Paths
// -----------------------------------------------------------------------------
module.exports = {
  publicAssets: publicAssets,
  scss: {
    src: [
      sourceFiles + '/scss/*.scss'
     // sourceFiles + '/scss/**/*.scss'
    ],
    dest: publicAssets + '/css',
    settings: {
      imagePath: '/dist/images', // Used by the image-url helper
//      includePaths: [
//        sourceFiles + '/vendor/'
//      ],
      indentedSyntax: false // Enable if you want to use .sass syntax!
    }
  },
  images: {
    src: sourceFiles + '/img/**',
    dest: publicAssets + '/img'
  },
  fonts: {
    src: sourceFiles + '/fonts/**',
    dest: publicAssets + '/fonts'
  },
  templates: {
    engine: templateEngine,
    src: sourceFiles + '/' + templateEngine + '/*.' + templateEngine,
    dest: sourceFiles + '/html' // we compile our templates into source folder (HTML)
                                // and then move to dest on HTML changes
  }
  iconFont: {
    name: clientName,
    src: sourceFiles + '/icons/*.svg',
    dest: publicAssets + '/fonts',
    sassDest: sourceFiles + '/stylesheets/base',
    template: './gulp/tasks/iconFont/template.scss',
    sassOutputName: '_icons.scss',
    fontPath: '../fonts',
    className: 'icon',
    options: {
      fontName: clientName + '-icons',
      appendCodepoints: true,
      normalize: false
    }
  }
};