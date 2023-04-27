const startTime = new Date();
const endTime = new Date(startTime.getTime() + 5*60000);
const endTime2 = new Date(endTime.getTime() + 2*(60*60*1000));

// console.log(startTime);
// console.log(endTime);
// displayElapsedTime(startTime, endTime); 

// console.log(endTime2);
// displayElapsedTime(startTime, endTime2);

//https://github.com/ralzohairi/stopwatch-js/blob/master/js/time-and-date-handling.js
function displayElapsedTime(startTime, endTime) {
    const timeDiff = (endTime.getTime() - startTime.getTime()) / 1000;
    const seconds = getSeconds(timeDiff);
    const minutes = getMinutes(timeDiff);
    const hours = getHours(timeDiff);
    return formatElapsedTime(hours, minutes, seconds);
}

function getSeconds(timeDiff) {
    return Math.round(timeDiff % 60);
}

function getMinutes(timeDiff) {
    return Math.round(strip(timeDiff) % 60); 
}

function getHours(timeDiff) {
    const hours = Math.floor(strip(strip(timeDiff)));
    return hours % 24;    
}

function strip(timeDiff) {
    return Math.floor(timeDiff / 60);
}

function formatElapsedTime(hours, minutes, seconds) {
    return formatTimeValue(hours) + ":" + formatTimeValue(minutes) + ":" + formatTimeValue(seconds);
}

function formatTimeValue(value) {
    return value < 10 ? "0" + value : value;
}

module.exports = { displayElapsedTime };