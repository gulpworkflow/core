var yaml      = require('yamljs');
var config    = yaml.load('src/config.yml');

module.exports = function() {
  // loop through each config object and push it to our array if "enable_task" is true
  var enabled_tasks = [];
  for (var task in config.tasks) {
  	task_name = task;
    if(config.tasks[task]['enable_task']===true) {
    	enabled_tasks.push(task_name);
    }
  }
  //console.log(enabled_tasks);
  return enabled_tasks;
}