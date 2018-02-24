"use strict";

  var builder = require('xmlbuilder');
  var fs = require('graceful-fs');
  /*
  * Extract all dependencies until 2nd level and generate a file with them
  *
  *
  function extractDependencies() {

    var argsDependencyList = ['npm', 'ls', '--json=true', '--depth=2', '2>/dev/null', '|', 'grep', 'from', '|', 'sed \'s/\\"//g\'', '|', 'awk', "'$1=$1'", '|', 'awk', "'{ print $2 }'", '>', '.dependency_list'];
    var dependencyList = shellescape (argsDependencyList);
    var argsDependencyListFormated = ['tr', '-d', '\n', '<', '.dependency_list', '>', '.dependency_list_formatted'];
    var dependencyListFormated = shellescape (argsDependencyListFormated);
  }
  */

  var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  var  appName = json.name;
  var pwdLocation = __dirname;
  var xml = builder.create('root');

  var applicationObj = {
    'Application': {
      '@name': appName,
      'Project': {
        '@ltd_name': 'javascript',
        '@path': pwdLocation+"/"+appName+".ppf"
      }
    }
  }

  var application = builder.create(applicationObj, { encoding: 'utf-8', version: '1.0' });
  fs.writeFile(appName+".paf", application.end({ pretty: true }), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("The Application (paf) file was saved!");
   });

   xml = builder.create('root');

   var projectObj = {
     'Project': {
       '@default_configuration_name': 'Configuration 1',
       '@ltd_name': 'javascript',
       '@name': appName,
       '@file_encoding': 'UTF-8',
       '@file_extension_set_name': 'javascript',
       'Configuration': { '@name': 'Configuration 1' },
       'Source': { '@exclude': 'false', '@path': '.', '@web': 'false'},
       'Source': { '@exclude': 'true', '@path': './node_modules', '@web': 'false'}
     }
   }

   var project = builder.create(projectObj, { encoding: 'utf-8', version: '1.0' });
   fs.writeFile(appName+".ppf", project.end({ pretty: true }), 'utf8', function(err) {
     if(err) {
       return console.log(err);
     }
     console.log("The Project (ppf) file was saved!");
   });
   return "Files created succesfully!!";
