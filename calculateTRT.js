"use strict";
const fs = require("fs");
const moment = require("moment");
const readFrom = "./harFiles";

(async ()=>{
    try {
        const files = await fs.promises.readdir( readFrom );
        for( const file of files ) {
            calculateTotalResponseTime(file);
        }
    }
    catch( e ) {
        console.error( "We've thrown! Whoops!", e );
    }

})();


function calculateTotalResponseTime(file) {
    const fileContents = fs.readFileSync(readFrom + '/' + file);
    const harContents = validateJSON(fileContents);

    if (!harContents) {
        console.error( "Invalid file");
        return;
    }

    var startTime = new Date(harContents.log.pages[0].startedDateTime);
    var loadTime = 0;

    // Loop over all entries to determine the latest request end time
    // The variable 'har' contains the JSON of the HAR file
    harContents.log.entries.forEach(function(entry) {
    var entryLoadTime = new Date(entry.startedDateTime);
    // Calculate the current request's end time by adding the time it needed to load to its start time
    entryLoadTime.setMilliseconds(entryLoadTime.getMilliseconds() + entry.time);
    // If the current request's end time is greater than the current latest request end time, then save it as new latest request end time
    if (entryLoadTime > loadTime) {
        loadTime = entryLoadTime;
    }
    });

    let loadTimeSpan = loadTime - startTime;
    console.log(file, '- ', formatDuration(loadTimeSpan));

}

function formatDuration(ms) {
  let duration = moment.duration(ms);
  return Math.floor(duration.asHours()) + moment.utc(duration.asMilliseconds()).format(":mm:ss");
}

function validateJSON(body) {
  try {
    var data = JSON.parse(body);
    return data;
  } catch(e) {
    return null;
  }
}
