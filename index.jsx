var Global = Global || {};
Global.jasmineJsxRootPath = new File($.fileName).parent;
Global.rootPath = Global.rootPath || (typeof(rootPath) != 'undefined' ? rootPath : null) || Global.jasmineJsxRootPath;
$.evalFile(Global.jasmineJsxRootPath + '/lib/jasmine-2.6.4.js');

$.evalFile(Global.rootPath + '/node_modules/extendscript-logger/index.jsx');
Global.logger = Global.loogger || (typeof(logger) != 'undefined' ? logger : null) || new Logger(Global.rootPath+'/log/test.log', 'INFO');

$.evalFile(Global.jasmineJsxRootPath + '/model/LogReporter.jsx');

/**
 * Timeout method used in QueueRunner.timer
 * @param  function cb Call back function to call after timeToWait
 * @param  ?   timeToWait [description]
 */
 $.global.setTimeout = function (cb, timeToWait) {
	 $.sleep(timeToWait);
	 cb();
 };

/**
 * Clearing method used in QueueRunner.timer
 */
$.global.clearTimeout = function () { };


function extend(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}

// Configure Jasmine
$.global.jasmine = jasmineRequire.core(jasmineRequire);
var env = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, env);
extend($.global, jasmineInterface);

var reporter = new LogReporter({
	logger: Global.logger,
	timer: {
		startedAt: null,
		start: function () {
			this.startedAt = moment();
		},
		elapsed: function () {
			return moment.duration(
				moment().diff(this.startedAt)
			).asMilliseconds();
		}
	},
});
env.addReporter(reporter);

function runJasmine() {
	env.execute();
}
