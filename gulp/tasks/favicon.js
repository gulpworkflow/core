// Generate favicons
// -----------------------------------------------------
// =======   
// Config Settings for Module
// =======  
var yaml         = require('yamljs');
var config       = yaml.load('gulp/config.yml').tasks.favicon;
// =======   
// Dependencies
// =======
var gulp         = require('gulp');  
var favicons     = require('favicons');

// =======   
// Default Settings for Favicons:
// =======  
var favicon_config = {
    files: {
        src: 'src/favicon/favicon_raw@260x260.png',                // Path(s) for file to produce the favicons. `string` or `object`
        dest: 'dist/favicons',               // Path for writing the favicons to. `string`
        html: 'src/html/index.html',               // Path(s) for HTML file to write or append metadata. `string` or `array`
        iconsPath: '../dist/favicons',          // Path for overriding default icons path. `string`
        androidManifest: null,    // Path for an existing android_chrome_manifest.json. `string`
        browserConfig: null,      // Path for an existing browserconfig.xml. `string`
        firefoxManifest: null,    // Path for an existing manifest.webapp. `string`
        yandexManifest: null      // Path for an existing yandex-browser-manifest.json. `string`
    },
    icons: {
        android: true,            // Create Android homescreen icon. `boolean`
        appleIcon: true,          // Create Apple touch icons. `boolean`
        appleStartup: true,       // Create Apple startup images. `boolean`
        coast: false,              // Create Opera Coast icon. `boolean`
        favicons: true,           // Create regular favicons. `boolean`
        firefox: true,            // Create Firefox OS icons. `boolean`
        opengraph: true,          // Create Facebook OpenGraph. `boolean`
        windows: true,            // Create Windows 8 tiles. `boolean`
        yandex: false              // Create Yandex browser icon. `boolean`
    },
    settings: {
        appName: null,            // Your application's name. `string`
        appDescription: null,     // Your application's description. `string`
        developer: null,          // Your (or your developer's) name. `string`
        developerURL: null,       // Your (or your developer's) URL. `string`
        version: 1.0,             // Your application's version number. `number`
        background: null,         // Background colour for flattened icons. `string`
        index: null,              // Path for the initial page on the site. `string`
        url: null,                // URL for your website. `string`
        silhouette: false,        // Turn the logo into a white silhouette for Windows 8. `boolean`
        logging: false            // Print logs to console? `boolean`
    }
}
// =======   
// Tasks:
// =======
gulp.task('favicon', function() {
  favicons({
    // I/O
    source: 'src/favicon/favicon-1024x1024.png',
    dest: 'dist',

    // Icon Types
    android: true,
    apple: true,
    coast: true,
    favicons: true,
    firefox: true,
    opengraph: false,
    windows: true,

    // Miscellaneous
    html: 'dist/index.html',
    background: 'transparent',
    tileBlackWhite: false,
    manifest: null,
    trueColor: false,
    logging: true
  });
});
