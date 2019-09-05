$.global.setTimeout = function (cb, timeToWait) {
    $.sleep(timeToWait);
    cb();
};

$.global.clearTimeout = function () {};

function extend(destination, source) {
    for (var property in source) destination[property] = source[property];
    return destination;
}

// *************************************************************************************

#include "../lib/extendscript-es5-shim-0.2.0.js"
#include "../lib/moment-2.24.0.js"
#include "../lib/jasmine-2.6.4.js"
// #include "jsxreporter.jsx"
#include "../models/Logger.jsx"
#include  "../models/LogReporter.jsx"

var logger = new Logger('DEBUG', 'test.log');

// *************************************************************************************

$.global.jasmine = jasmineRequire.core(jasmineRequire);
var env = jasmine.getEnv();
var jasmineInterface = jasmineRequire.interface(jasmine, env);
extend($.global, jasmineInterface);
var LogReporter = jasmineRequire.LogReporter();
var reporter = new LogReporter({
	logger: new Logger('DEBUG', 'test.log'),
});
// var JsxReporter = jasmineRequire.JsxReporter();
// var reporter = new JsxReporter({
//     onComplete: function () {
//         // $.writeln('FINISHED!!!');
//     }
// });
// env.addReporter(jasmineInterface.jsApiReporter);
env.addReporter(reporter);


// *************************************************************************************

function runJasmine () {
    env.execute();
}
