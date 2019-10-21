//@include '../index.jsx'

logger.warn('To prevent odd errors, usually methods not being defined, login into Adobe Creative Cloud and all modal/dialog boxes are open. If tests are not running as expected, try restarting the application.');

//load specs 
var specPath = rootPath + '/test/spec';
if (arguments && arguments.length > 0) { //load specified files
	logger.info('Loading specs: ' + arguments.toString());
	arguments.forEach(function (specName) {
		if (!specName.match(/Spec/)) {
			specName += 'Spec';
		}
		$.evalFile(specPath + '/' + specName + '.jsx');
	});
} else { //load everything
	logger.info('Loading all specs in ' + specPath.toString());
	var specFolder = new Folder(specPath);
	specFolder.getFiles().forEach(function (f) {
		if (f.name.match(/Spec\.jsx$/)) {
			$.evalFile(f.fullName);
		}
	});
}

//Brings application to forefront to prioritizes running tests.
app.activate();

runJasmine();
