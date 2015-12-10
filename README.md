<img src="https://avatars3.githubusercontent.com/u/15914827?v=3&s=200" width="100" height="100">

# Gulp Workflow
_Gulp Workflow is a toolset for designers & developers to deliver their projects at blazing speeds.  This workflow is a centralized set of gulp tasks, helper functions, and configurations that allow you to work more consistently & quickly.  The workflow itself is highly configurable & unopinionated and, therefore, is compatible with virtually any web-based system!  To help you get started, we have a series of starters for WordPress, static sites, Jeykll, and Email templates._  
  
* [What does it do?]()  
* [How does it work?]()
* [How to install]()  
* [Create your own starter]()  

## What does it do?
_Gulp Workflow is designed to help you the following things:_
  
### 1) Organize your source code
You are free to organize your code in the way that is most intuitive to you & your team as the authors.  Let the task runners build your project the way WordPress, Jeykll, Apache, etc require.  Cast away your shackles!  
[See an example](https://raw.githubusercontent.com/gulpworkflow/wiki-images/master/core-src-demo.png)  

### 2) Automate the build process
Let our build system handle the dirty work so you can focus on creative solutions!  Gulp Workflow can handle the following things:
* **[Browser Sync]()** – Never reload your browser during development again! (via BrowserSync)
* **[HTML]()** – Use static HTML or compile templates (jade, twig, nunjucks), use real data if you'd like! 
* **[Emails]()** – Inline your CSS/Send test emails/Litmus integration
* **[Favicons]()** – Generate Favicons and associated markup
* **[Fonts]()** – Queue your fonts for web use
* **[Icon Font]()** – Generate iconfont from a folder of SVGs
* **[Images]()** – Minify/compress your images
* **[Javascript Modules]()** – ES6 supported w/ Babel, sourcemaps, lint
* **[SASS/SCSS]()** – Compile CSS, auto-prefix, lint, sourcemaps
* **[Sprites]()** – Generate a Sprite from a set of images
* **[Watch]()** – Listen for changes to any arbitrary set of files and move them to the right place.  This helps you store your source however you'd like (ie php, meta info, theme files, content, etc)

### 3) Optimize + bundle your project for deployment
When you're ready to deploy, Gulp Workflow will bundle your project together into a nice and clean folder for deployment.  Features:
* **[Minification]()** – JS + CSS optimized and uglified
* **[Asset revisioning]()** – All filenames are revisioned with an md5 hash, a rev-manifest.json file is generarted and all asset references are updated in html, css, and js.  This is crucial to help bust caches and quickly determine if server files are up-to-date.  Similar to the Rails Asset Pipeline
* **[File size reporting]()** – Know the performance toll and bandwidth cost of your project right from the command line
