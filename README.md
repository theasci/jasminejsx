# Overview

A version of [jasmine](https://jasmine.github.io) that works with Adobe ExtendScript.  ExtendScript is a JavaScript variant that allows you to create and run scripts that extend Adobe's Creative Suite.

# Environment

This has been developed and tested on Mac OS X 10.14.5 machine with Adobe InDesign CC 2019. All but the command line `test/run` (described below) should work on other platforms.

This uses an old version of [jasmine v2.5](https://jasmine.github.io/2.5/introduction) since ExtendScript is so old.

# Installation

Simply install it like any other npm package.

```sh
npm install jasminejsx
```

# Usage

1. Create a `test/spec` directory for your `*Spec.jsx` files.
1. Create a custom `test/run.jsx` that will bootstrap your testing environment. You can run this through an InDesign Scripts panel if you linked it properly to the `/Applications/Adobe InDesign CC 2019/Scripts/Scripts Panel/` directory.
    ```js
    //Custom environment loads here. This should define a rootPath
    //@include '../index.jsx'
    
    //Create a new logger instance
    var logger = new Logger(rootPath+'/log/test.log');
    
    //Run Jasmine
    $.evalFile(rootPath + '/node_modules/jasminejsx/test/run.jsx');
    ```
1. If you want to be able to run these test from the command line, link to the `node_modules/jasminejsx/test/run` file. This currently only works with OSX machines as it uses JavaScript for automation to open InDesign and run the tests.
    ```
    ln -s ../node_modules/jasminejsx/test/run test/run
    ```
1. Run all tests with `test/run` or specific tests with `test/run CalculatorSpec`.

# Testing

`npm test` or `test/run`

Output should look like:

```
me@host jasminejsx|master$ test/run
1|2019-10-17T12:47:80|INFO|***************************
2|2019-10-17T12:47:80|INFO|Jasmine ExtendScript Runner
3|2019-10-17T12:47:80|INFO|***************************
4|2019-10-17T12:47:81|INFO|Loading all specs in ~/projects/jasminejsx/test/spec
5|2019-10-17T12:47:84|INFO|53 specs, 0 failures, 51 pending specs
6|2019-10-17T12:47:85|INFO|Finished in 0.025 seconds
```
