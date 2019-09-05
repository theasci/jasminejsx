//Loads Jasmine and execute specs files

$.strict = true;

var rootPath = new File($.fileName).parent
$.evalFile(rootPath + '/boot.jsx');

//Load spec files
var specsPath = rootPath + '/specs';
$.evalFile(specsPath + '/calculator.jsx');
$.evalFile(specsPath + '/SpecLength.jsx');

//Give InDesign more resources by being active
// app.activate();

runJasmine();
