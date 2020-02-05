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
2. In your test folder, create your own `run.jsx` file that will bootstrap your testing environment. Here's what it should look like:

    ```js
    // Define your root path - this will be the folder that contains your node_modules folder
	var rootPath = new File($.fileName).parent.parent;
	//@include '../node_modules/jasminejsx/index.jsx'

	// sanity check - you can delete this after you verify your root path is correct
	logger.info('rootPath is: ' + rootPath);

	// Run Jasmine
	$.evalFile(rootPath + '/node_modules/jasminejsx/test/run.jsx');
    ```

	You can run this script in a few ways:

	* You can run this through the InDesign Scripts panel if you linked it properly to the `Scripts/Scripts Panel/` directory inside your Adobe InDesign application directory.
	* You can run this from VS Code using Adobe's ExtendScript Debugger. Just create a debug configuration that points to it
	* You can run it from the ExtendScript Toolkit
	* From the command line - see below

3. If you want to be able to run these test from the command line, link to the `node_modules/jasminejsx/test/run` file. This currently only works with OSX machines as it uses JavaScript for automation to open InDesign and run the tests.

    ```bash
    ln -s ../node_modules/jasminejsx/test/run test/run
    ```

4. Run all tests with `test/run` or specific tests with `test/run CalculatorSpec`.

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

# NPM Release Tasks

1. Ensure tests pass.
1. Update `package.json` version number
1. `npm install` to update package lock.
1. Update `CHANGELOG.md` with changes since last release.
1. Check them all into the repository.
1. `npm publish` to deploy the release to npm.
1. `git tag -a <version> -m <version>; git push --tags`
