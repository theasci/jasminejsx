#/bin/bash

DIRECTORY=$(cd `dirname $0` && pwd)
EXTENDSCRIPT="$DIRECTORY/run.jsx"
EXTENDSCRIPT_LOG="$DIRECTORY/logs/test.log"

echo "Starting ExtendScript specs..."
echo "Be sure you are signed into the Creative Cloud app or you'll get no output from the test suite."
timerStart=$(($(gdate +%s%N)/1000000))

# Truncate test log
> "$EXTENDSCRIPT_LOG" &> /dev/null

# See available languages with `osalang`
osascript -l "JavaScript" -e "var app = new Application('com.adobe.indesign'); app.doScript('$EXTENDSCRIPT', {language: 'javascript'});"
#osascript -e "tell application \"Adobe InDesign CC 2019\" to do script POSIX file \"$EXTENDSCRIPT\" language javascript"

cat "$EXTENDSCRIPT_LOG" 2> /dev/null

timerStop=$(($(gdate +%s%N)/1000000))
milleseconds=$(echo "($timerStop - $timerStart)/1000"| bc -l)
echo "Time to complete: $(printf "%.3f" $milleseconds) seconds"
