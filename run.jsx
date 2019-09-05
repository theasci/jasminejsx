//Loads Jasmine and execute specs files

$.strict = true;

var rootPath = new File($.fileName).parent
$.evalFile(rootPath + '/boot.jsx');

//Load spec files
var specPath = rootPath + '/spec';
$.evalFile(specPath + '/calculator.jsx');
$.evalFile(specPath + '/SpecLength.jsx');

//Give InDesign more resources by being active
// app.activate();

runJasmine();
