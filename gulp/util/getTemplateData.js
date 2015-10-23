// Get data (JSON) for the templates
// -----
// json files *must* have the same name as the template file to pipe into the template
// eg - "page.twig" will automatically be populated by data in "page.json"
// define the folder (relative to templates) in config.yml
var path         = require('path');

module.exports = function(file,data_folderName) {
  template_data_dirname = path.dirname(file.path) + '/' + data_folderName;
  template_data_extName = path.extname(file.path)
  template_data_filename = path.basename(file.path, template_data_extName) + '.json'
  template_data_filePath = template_data_dirname + "/" + template_data_filename;
  template_data = require(template_data_filePath);
  //console.log(template_data);
  return template_data;
}