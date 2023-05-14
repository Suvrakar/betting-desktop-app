const puppeteer = require('puppeteer');
const mongoose = require("mongoose");
const Horse = require("./Horse");

mongoose.connect("mongodb+srv://dksuvra:01711536682Suv@cluster0.jtz012f.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


(async () => { 
    const browser = await puppeteer.launch({
        headless: true,
        ignoreHTTPSErrors: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--ignore-certificate-errors'
        ]
    });

    const page = await browser.newPage();
    await page.setUserAgent('5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36');

    await page.goto("https://www.punters.com.au/stats/horses/#rankBy=prizeMoney&area=CountryID:16|MeetingType:Metro", { waitUntil: 'load', timeout: 0 })
        .then(() => console.log("Goto Success!!"))
        .catch((err) => console.log("GOTO:", err));


    const horseTableData = await page.$$eval('table', tables => {
        const rows = tables[0].querySelectorAll('tr');
        const data = [];

        // Loop through each row
        for (let i = 1; i < rows.length; i++) {
            const cells = rows[i].querySelectorAll('td');
            const rowData = {};

            // Loop through each cell in the row
            for (let j = 0; j < cells.length; j++) {
                const header = rows[0].querySelectorAll('th')[j].textContent.trim();
                const value = cells[j].textContent.trim();
                rowData[header === 'Prize Money' ? 'Avg_earning' : header] = header === 'Horses' ? value.replace(/^\d+\.\s+/, '') : value;
            }

            data.push(rowData);
        }

        return data.slice(0, 6);
    });


    const horseData = horseTableData.map((horse, index) => {
        const data = {
            horseName: horse.Horses,
            horseNumber: (index + 1).toString(),
            position: '1',
            age: 1,
            total_earnings: horse.Avg_earning,
            track: 'Metropolitan',
            raceDistance: '',
            raceNumber: '',
            odds: 0,
            lastStartTrack: 'Metropolitan',
            lastStartDay: 'Saturday',
            startDate: new Date().toLocaleDateString('en-GB'),
            endDate: new Date().toLocaleDateString('en-GB'),
            previousTrack: '',
            currentTrack: '',
            races: 'Australia',
            lastStartBeatenLengths: 6,
            lastStartBettingLine: 6,
            currentRaceDistance: '120',
            lastStartLengths: '',
            currentRaceBettingPosition: '',
            lastStartDate: ''
        };
        return data;
    });


    console.log(horseData);

    await Horse.deleteMany({});
    
    for (let i = 0; i < horseData.length; i++) {
        const horse = new Horse(horseData[i]);
        await horse.save();
    }


    await browser.close();
})();
