var rootPath = new File($.fileName).parent
$.evalFile(rootPath + '/lib/jasmine-2.6.4.js');
$.evalFile(rootPath + '/models/LogReporter.jsx');
$.evalFile(rootPath + '/models/Logger.jsx');

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

// Add Reporter
var reporter = new LogReporter({
    logger: new Logger('DEBUG', 'test.log'),
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
