# Overview

A version of Jasmine that works with Adobe ExtendScript.  ExtendScript is a JavaScript variant that allows you to create and run scripts that extend Adobe's suite of create products.

# Usage
To use Jasmine JSX:

```sh
# Install dependencies
npm install

# Run the specs!
./run.sh
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
1. Create a custom `run.jsx` that will bootstrap your testing environment. This can be run directly in the InDesign Scripts Panel 
    ```js
    var rootPath = new File($.fileName).parent; 
    var loggerPath = rootPath+'/logs/myTest.log'; //custom log path 
    $.evalFile(rootPath + '/node_modules/jasminejsx/boot.jsx');

    var specPath = rootPath + '/tests/spec';
    $.evalFile(specPath + '/MySpec.jsx');

    runJasmine();
    ```
1. Add a custom `run.sh` to run the specs in an application
    ```sh
    #/bin/bash
    DIRECTORY=$(cd `dirname $0` && pwd)
    EXTENDSCRIPT="$DIRECTORY/run.jsx"
    EXTENDSCRIPT_LOG="$DIRECTORY/../node_modules/jasminejsx/log/test.log"

    echo "Starting ExtendScript specs..."
    echo "Be sure you are signed into the Creative Cloud app or you'll get no output from the test suite."
    timerStart=$(($(gdate +%s%N)/1000000))

    # Truncate test log
    > "$EXTENDSCRIPT_LOG" &> /dev/null

    # See available languages with `osalang`
    osascript -l "JavaScript" -e "var app = new Application('com.adobe.indesign'); app.doScript('$EXTENDSCRIPT', {language: 'javascript'});"

    cat "$EXTENDSCRIPT_LOG" 2> /dev/null

    timerStop=$(($(gdate +%s%N)/1000000))
    milleseconds=$(echo "($timerStop - $timerStart)/1000"| bc -l)
    echo "Time to complete: $(printf "%.3f" $milleseconds) seconds"
    ```
1. `./run.sh` now!