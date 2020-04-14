# Overview

A version of [jasmine](https://jasmine.github.io) that works with Adobe ExtendScript.  ExtendScript is a JavaScript variant that allows you to create and run scripts that extend Adobe's Creative Suite.

# Environment

This has been developed and tested on 
* Mac OS X 10.14.5 with Adobe InDesign CC 2019
* Mac OS X 10.14.5 with Adobe InDesign CC 2020
* Mac OS X 10.15.3 with Adobe InDesign CC 2020

All but the command line `test/run` (described below) should work on other platforms.

This uses an old version of [jasmine v2.6](https://jasmine.github.io/2.6/introduction) since ExtendScript is so old.

# Installation

Simply install it like any other npm package. Nice [npm setup tutorial here](https://www.sitepoint.com/beginners-guide-node-package-manager/).

```sh
npm install jasminejsx
```

You may also elect to add it to your `package.json` as development dependency:

```json
"devDependencies": {
  "jasminejsx": "^0.1.0"
}
```

and install with a `npm install`.

# Usage

1. Create a `test/spec` directory for your `*Spec.jsx` files.
1. In your `test/` folder, create your own `run.jsx` file that will bootstrap your testing environment. Here's what it should look like:

    ```js
    // Define your root path - this will be the folder that contains your node_modules folder
    var Global = Global || {};
    Global.rootPath = new File($.fileName).parent.parent;
    Global.modulesPath = new File(Global.rootPath + '/node_modules');

    // Define an optional Logger to override default
    // $.evalFile(Global.modulesPath + '/extendscript-logger/index.jsx');
    // Global.logger = new Logger(Global.rootPath+'/log/mytestlog.log', 'DEBUG');
    
    //Configuration options
    //Global.jasminejsx.specPath = new File(Global.rootPath + '/test/spec');
    //Global.jasminejsx.reportPending = true;
    
    //Load the jasminejsx setup
    //@include '../node_modules/jasminejsx/index.jsx'

    // Sanity check, you can delete this after you verify your root path is correct.
    Global.logger.info('Global.rootPath is: ' + Global.rootPath);

    // Run Jasmine
    $.evalFile(Global.modulesPath + '/jasminejsx/test/run.jsx');
    ```

    You can run this script in a few ways:

    * You can run this through the InDesign Scripts panel if it is linked properly to the `Scripts/Scripts Panel/` directory inside your Adobe InDesign application directory.
    * You can run this from VS Code using [Adobe's ExtendScript Debugger](https://marketplace.visualstudio.com/items?itemName=Adobe.extendscript-debug). Just create a debug configuration that points to it.
    * You can run it from within [Adobe ExtendScript Toolkit](https://www.adobe.com/devnet/scripting/estk.html). Not recommended as [future development is not in the works for ESTK](https://medium.com/adobetech/workaround-for-extendscript-toolkit-debugger-error-1116-f067f81f96c6). 
    * From the command line - see below.

3. If you want to be able to run these test from the command line, link to the `node_modules/jasminejsx/test/run` file. This currently only works with OSX machines as it uses JavaScript for automation to open InDesign and run the tests.

    ```bash
    ln -s ../node_modules/jasminejsx/test/run test/run
    ```

4. Run all tests with `test/run` or specific tests with `test/run CalculatorSpec`.

# Testing

`npm test` or `test/run`

Output should look like:

```
me@host$ test/run
2020-02-25T12:13:22|INFO|***************************
2020-02-25T12:13:22|INFO|Jasmine ExtendScript Runner
2020-02-25T12:13:22|INFO|***************************
2020-02-25T12:13:22|WARN|To prevent odd errors, usually methods not being defined, login into Adobe Creative Cloud and verify all modal dialog boxes are closed. If tests are not running as expected, try restarting the application.
2020-02-25T12:13:23|INFO|Loading all specs in /Users/spyle/projects/jasminejsx/test/spec
2020-02-25T12:13:29|INFO|53 specs, 0 failures, 51 pending specs
2020-02-25T12:13:29|INFO|Finished in 0.035 seconds
```

# NPM Release Tasks

1. Update `package.json` version number
1. `npm install` to update package lock.
1. `npm test` to ensure tests pass.
1. Update `CHANGELOG.md` with changes since last release.
1. Check them all into the repository.
1. `git tag -a <version> -m <version>; git push --tags`
1. `npm publish` to deploy the release to npm.

# Thanks

A big thank you to [@tmaslen](https://github.com/tmaslen) for the original idea and development of jasminejsx.
