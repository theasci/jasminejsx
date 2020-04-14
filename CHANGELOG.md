# Change Log
All notable changes to this project will be documented in this file.
 
The format is based on [Keep a Changelog](http://keepachangelog.com/) and this project adheres to [Semantic Versioning](http://semver.org/).

# 0.4.0 - 2020-04-14

## Added

1. Pending message output can now be with the configuration object `Global.jasminejsx`. See `test/run.jsx`.

# 0.3.1 - 2020-03-31

## Fixed

1. [Fix spec file name generation in test/run.jsx](https://github.com/theasci/jasminejsx/commit/b69b75a02fd604e52e5b6c5ee5c62314936413cd). This was not finding files with "Special" in the name.

# 0.3.0 - 2020-03-03

## Fixed

1. [Simplify LogReporter.timer.elapsed](https://github.com/theasci/jasminejsx/commit/8c97fe9ccef44195319916c128159c70bab6aae4) method to use diff instead of durations. Durations still appear to work in node but not in ExtendScript.

## Changed

1. Upgrade [extendscript-logger](https://github.com/theasci/extendscript-logger) to 0.3.0 which now uses [extendscript-json](https://github.com/theasci/extendscript-json).

# 0.2.0 - 2020-03-03

## Changed

1. `index.jsx` will attempt to get the rootPath and logger from a `Global` object before looking at a global variables. `README.md` has been updated accordingly.

# 0.1.0 - 2020-02-25

## Changed

1. Added specStart and specDone debug messages so that debugging inter-dependent tests can be done. Default logger starts with a severity level of INFO. 

# 0.0.5 - 2020-02-07

## Changed

1. Merged [pull request #2](https://github.com/theasci/jasminejsx/pull/2) to support running tests in [ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug). Thanks [@lsh246](https://github.com/lsh246)!

# 0.0.4 - 2019-10-21

## Changed

1. Upgraded [extendscript-logger](https://github.com/theasci/extendscript-logger) 0.1.0

# 0.0.3 - 2019-10-21

## Changed

1. Upgraded [extendscript-logger](https://github.com/theasci/extendscript-logger) 0.0.2

# 0.0.2 - 2019-10-17

## Changed

1. Use [extendscript-logger](https://github.com/theasci/extendscript-logger) 0.0.1 through NPM.
