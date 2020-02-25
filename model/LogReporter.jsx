// Adapted from https://raw.githubusercontent.com/tmaslen/jasminejsx/master/jasmine/jsxreporter.jsx
function LogReporter(options) {

	var noopTimer = {
		start: function () { },
		elapsed: function () { return 0; },
	};

	var showColors = options.showColors || false,
		 //This is necessary to allow us to tail the log and quit.
		 //This will never be seen if using run.sh.
		onComplete = options.onComplete || function (passed) { logger.info('Completed') },
		timer = options.timer || noopTimer,
		specCount,
		failureCount,
		failedSpecs = [],
		pendingCount,
		failedSuites = [],
		logger = options.logger || null;

	if (!logger) {
		throw new TypeError('Logger instance must be given.');
	}

	logger.info('***************************');
	logger.info('Jasmine ExtendScript Runner');
	logger.info('***************************');

	this.jasmineStarted = function () {
		specCount = 0;
		failureCount = 0;
		pendingCount = 0;
		timer.start();
	};

	this.specStarted = function(result) {
		logger.debug('Starting: '+ result.fullName);
	}

	this.jasmineDone = function () {
		for (var i = 0; i < failedSpecs.length; i++) {
			specFailureDetails(failedSpecs[i]);
		}

		if (specCount > 0) {

			var specCounts = specCount + ' ' + plural('spec', specCount) + ', ' +
				failureCount + ' ' + plural('failure', failureCount);

			if (pendingCount) {
				specCounts += ', ' + pendingCount + ' pending ' + plural('spec', pendingCount);
			}

			logger.info(specCounts);
		} else {
			logger.info('No specs found');
		}

		var seconds = timer.elapsed() / 1000;
		logger.info('Finished in ' + seconds + ' ' + plural('second', seconds));

		for (i = 0; i < failedSuites.length; i++) {
			suiteFailureDetails(failedSuites[i]);
		}

		onComplete(failureCount === 0);
	};

	this.specDone = function (result) {
		logger.debug('Ending: ' + result.fullName + ' ' + result.status);
		specCount++;
		
		if (result.status == 'pending') {
			pendingCount++;
			return;
		}

		if (result.status == 'passed') {
			return;
		}

		if (result.status == 'failed') {
			failureCount++;
			failedSpecs.push(result);
		}
	};

	this.suiteDone = function (result) {
		if (result.failedExpectations && result.failedExpectations.length > 0) {
			failureCount++;
			failedSuites.push(result);
		}
	};

	return this;

	function plural(str, count) {
		return count == 1 ? str : str + 's';
	}

	function repeat(thing, times) {
		var arr = [];
		for (var i = 0; i < times; i++) {
			arr.push(thing);
		}
		return arr;
	}

	function indent(str, spaces) {
		var lines = (str || '').split('\n');
		var newArr = [];
		for (var i = 0; i < lines.length; i++) {
			newArr.push(repeat(' ', spaces).join('') + lines[i]);
		}
		return newArr.join('\n');
	}

	function specFailureDetails(result) {
		logger.info(result.fullName);

		for (var i = 0; i < result.failedExpectations.length; i++) {
			var failedExpectation = result.failedExpectations[i];
			logger.info(indent(failedExpectation.message, 2));
			logger.info(indent(failedExpectation.stack, 2));
		}

	}

	function suiteFailureDetails(result) {
		for (var i = 0; i < result.failedExpectations.length; i++) {
			logger.info('An error was thrown in an afterAll');
			logger.info('AfterAll ' + result.failedExpectations[i].message);

		}
	}
	return this;
}
