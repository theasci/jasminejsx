# Overview

A version of Jasmine that works with Adobe ExtendScript.  ExtendScript is a JavaScript variant that allows you to create and run scripts that extend Adobe's suite of create products.

# Usage
To use Jasmine JSX:

```sh
# Install dependencies
npm install

# Run the specs!
./test/run
```

# Adding to a project

Treat it like an npm module.

1. Define a git dependency in your `package.json:
    ```json
    "dependencies": {
        "jasminejsx": "git://github.com/theasci/jasminejsx.git#master"
    },
    ```
1. Install it and its dependencies to your `node_modules`.
    ```sh
    npm install
    ```
1. Create a spec directory for your `*Spec.jsx` files.
1. Create a custom `run.jsx` that will bootstrap your testing environment. This can be run directly in the InDesign Scripts Panel.
    ```js
    var rootPath = new File($.fileName).parent;
    var logger = new Logger('DEBUG', rootPath+'/logs/test.log');
    $.evalFile(rootPath + '/node_modules/jasminejsx/boot.jsx');

    var specPath = rootPath + '/tests/spec';
    $.evalFile(specPath + '/MySpec.jsx');

    runJasmine();
    ```
1. Add a custom `run.sh` to run the specs in an application.
    ```sh
    #/bin/bash

    DIRECTORY=$(cd `dirname $0` && pwd)
    EXTENDSCRIPT="$DIRECTORY/run.jsx"
    EXTENDSCRIPT_LOG="$DIRECTORY/log/test.log"

    # Truncate test log
    > "$EXTENDSCRIPT_LOG" &> /dev/null

    # See available languages with `osalang`
    osascript -l "JavaScript" -e "var app = new Application('com.adobe.indesign'); app.doScript('$EXTENDSCRIPT', {language: 'javascript'});" &
    #osascript -e "tell application \"Adobe InDesign CC 2019\" to do script POSIX file \"$EXTENDSCRIPT\" language javascript"

    # This tail + sed combination requires a final log write by the LogReporter.onComplete function so that it can quit properly.
    tail -f "$EXTENDSCRIPT_LOG" | sed '/Finished in/ q'
    ```
1. `./run.sh` now!
