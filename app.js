const EasyFit = require('easy-fit').default;
const fs = require('fs');
const elapsedTime = require("./time");
const WPrimeCalculator = require("./calculator");

const calculator = new WPrimeCalculator(270, 14600);
const buffer = fs.readFileSync('8654222832_Open_Dat.fit');
const easyFit = new EasyFit();

easyFit.parse(buffer, (error, data) => {
    if (error) {
        console.error(error);
    } else {      
        const startTimestamp = data.records[0].timestamp;        
        data.records.forEach((record) => {
            const power = (record.power == null || record.power < 0) ? 0 : record.power;
            const timestamp = record.timestamp;            
            calculator.computeDifferential(power);                                                                 
            console.log(elapsedTime.displayElapsedTime(startTimestamp, timestamp) + "|" + calculator.wPrimeBalance);            
        });
    }
});