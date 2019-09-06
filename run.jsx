//Loads Jasmine and execute specs files

$.strict = true;

var rootPath = new File($.fileName).parent
$.evalFile(rootPath + '/boot.jsx');

//Load spec files
var specPath = rootPath + '/spec';
$.evalFile(specPath + '/Calculator.jsx');
$.evalFile(specPath + '/LoggerSpec.jsx');
$.evalFile(specPath + '/SpecLength.jsx');

//Brings application to forefront to prioritizes running tests.
app.activate();

runJasmine();
