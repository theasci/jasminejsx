//@include '../index.jsx'

logger.warn('To prevent odd errors, usually methods not being defined, login into Adobe Creative Cloud and verify all modal dialog boxes are closed. If tests are not running as expected, try restarting the application.');

//load specs 
var specPath = new File(rootPath + '/test/spec');
if (typeof arguments !== 'undefined' && arguments && arguments.length > 0) { //load specified files
	logger.info('Loading specs: ' + arguments.join(', '));
	arguments.forEach(function (specName) {
		if (!specName.match(/Spec/)) {
			specName += 'Spec';
		}
		var f = new File(specPath.fsName + '/' + specName + '.jsx');
		if(!f.exists) {
			throw new Error(f.fsName+' does not exist.');
		}
		try {
			$.evalFile(f);
		} catch(e) {
			throw new Error('Failed to load '+f.fsName+' because '+e.message+' on line '+e.line+'.');
		}
	});
} else { //load everything
	logger.info('Loading all specs in ' + specPath.fsName);
	var specFolder = new Folder(specPath.fsName);
	specFolder.getFiles().forEach(function (f) {
		if (f.name.match(/Spec\.jsx$/)) {
			try {
				$.evalFile(f);
			} catch(e) {
				throw new Error('Failed to load '+f.fsName+' because '+e.message+' on line '+e.line+'.');
			}
		}
	});
}

//Brings application to forefront to prioritizes running tests.
app.activate();

runJasmine();
