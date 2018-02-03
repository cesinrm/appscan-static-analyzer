"use strict";


  //var sys = require('cmd');
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
  //const loadJsonFile = require('load-json-file');
  var builder = require('xmlbuilder');
  var fs = require('graceful-fs');
  var shellescape = require('shell-escape');
  //var json = require('./package.json');

   //appName='';
  var json = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
  //console.log(json);
  //loadJsonFile('./package.json').then(json => {
  var  appName = json.name;
  //});
  var argPwd = ['pwd'];
  var pwd = shellescape (argPwd);

  var xml = builder.create('root');

  var applicationObj = {
    'Application': {
      '@name': appName,
      'Project': { '@language_type': '2', '@path': pwd }
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
       '@language_type': '2',
       '@name': appName,
       'Configuration': { '@class_path': './;node_modules', '@name': 'Configuration 1' },
       'Source': { '@exclude': 'false', '@path': '.', '@web': 'true'}
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
