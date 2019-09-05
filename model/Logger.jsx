$.evalFile(rootPath + '/node_modules/extendscript-es5-shim/index.js');
$.evalFile(rootPath + '/node_modules/moment/moment.js');

/**
 * Handles logging messages to different sources. Creates log in hosts/log/ directory.
 * @see https://github.com/sidpalas/extendscript-logging
 *
 * var logger = Logger('DEBUG','mylog.log');
 */
var Logger = function(severity, logName){
	this.name = arguments.callee.name;
	this.lastLog = null;
	this.logId = 1;
	this.separator = '|';
	this.levels = [
		'DEBUG',
		'INFO',
		'NOTICE',
		'WARN',
		'ERROR',
		'CRITICAL'
	];
	this.severity = severity ? severity : 'INFO';
	this.logName = logName ? logName : 'host.log';

	this.debug = function(message) {
		return this.log(message, 'DEBUG');
	}
	this.info = function(message) {
		return this.log(message, 'INFO');
	}
	this.notice = function(message) {
		return this.log(message, 'NOTICE');
	}
	this.warn = function(message) {
		return this.log(message, 'WARN');
	}
	this.error = function(message) {
		return this.log(message, 'ERROR');
	}
	this.critical = function(message) {
		return this.log(message, 'CRITICAL');
	}

	/**
	 * Convenience function to log exceptions from try-catch blocks.
	 * Usually called as `catch(e){ logger.exception(e); }`
	 * @param  Exception exception
	 * @param  string fileName Originating file path
	 * @return boolean
	 */
	this.exception = function(error, severity) {
		//Undocumented error properties. This code borrowed from Jasmine's ExceptionFormatter
		var msg = error.name + ': ' + error.message;
		if (error.fileName || error.sourceURL) {
			msg += ' in ' + (error.fileName || error.sourceURL);
		}
		if (error.line || error.lineNumber) {
			msg += ' (line ' + (error.line || error.lineNumber) + ')';
		}
		return this.log(msg, severity || 'WARN');
	}

	this.messageString = function(message, severity){
		var msg = this.logId;
		msg += this.separator + moment().format('YYYY-MM-DDTHH:mm:SS');
		msg += this.separator + severity;
		
		if(typeof(message) == 'object') {
			msg += this.separator + JSON.stringify(message);
		} else {
			msg += this.separator + message
		}
		
		return msg;
	}

	this.file = function() {
		var logDirString = new File($.fileName).path + "/../log/"
		var logDir = new Folder(logDirString);
		if (!logDir.exists){
			logDir.create();
		}
		var logFilePath = logDirString + this.logName;
		return new File(logFilePath);
	}
	
	/**
	 * Determine if we should show a message at the given severity.
	 * @param  string severity, one of this.levels
	 * @return boolean
	 */
	this.meetsSeverity = function(severity) {
		return this.levels.indexOf(severity) >= this.levels.indexOf(this.severity);
	}
	
	this.log = function(message, severity) {
		if(this.levels.indexOf(severity) == -1) {
			throw new TypeError('Severity '+severity+' is not one of Logger.levels');
		}
		
		if(!this.meetsSeverity(severity)) {
			return false;
		}
		
		var file = this.file();
		file.open('a+');
		file.encoding = 'UTF-8';
		file.lineFeed = 'Unix';
		this.lastLog = this.messageString(message,severity);
		file.writeln(this.lastLog);
		file.close();
		this.logId += 1;
		return true;
	}
	
	/**
	 * Deletes this log immediately. Useful in testing.
	 * @return boolean
	 */
	this.delete = function() {
		return this.file().remove();
	}
	
	return this;
}
