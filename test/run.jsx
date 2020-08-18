//@include '../index.jsx'

Global.logger.warn('To prevent odd errors, usually methods not being defined, login into Adobe Creative Cloud and verify all modal dialog boxes are closed. If tests are not running as expected, try restarting the application.');

//Configuration
Global.jasminejsx = Global.jasminejsx || {};
Global.jasminejsx.specPath = Global.jasminejsx.specPath || new File(Global.rootPath + '/test/spec');
//lists each pending spec and the associated message
Global.jasminejsx.reportPending = Global.jasminejsx.reportPending || false; 

//Load specs
if (typeof arguments !== 'undefined' && arguments && arguments.length > 0) { //load specified files
	Global.logger.info('Loading specs: ' + arguments.join(', '));
	arguments.forEach(function (specName) {
		var specFileName = specName;

		//add missing Spec.jsx
		if(!specName.match(/\.jsx$/)) {
			if (!specName.match(/Spec$/)) {
				specFileName = specName + 'Spec';
			}
			specFileName += '.jsx';
		}
		
		//append spec path if it doesn't include root /
		if(specFileName.match(/^\//)) {
			var f = new File(specFileName);	
		} else {
			var f = new File(Global.jasminejsx.specPath.fsName + '/' + specFileName);	
		}
		
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
	Global.logger.info('Loading all specs in ' + Global.jasminejsx.specPath.fsName);
	var specFolder = new Folder(Global.jasminejsx.specPath.fsName);
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

//Bring application to forefront to prioritize running tests.
app.activate();

runJasmine();
