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
