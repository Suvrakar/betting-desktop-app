const mongoose = require('mongoose');
const Horse = require('./models/horse');

// connect to the MongoDB database
mongoose.connect('mongodb+srv://dksuvra:01711536682Suv@cluster0.jtz012f.mongodb.net/test');

// create some sample data
const horses = [
    {
        name: 'Secretariat',
        position: '1st',
        age: 3,
        total_earnings: 1230000,
        track: 'Belmont Park',
        raceDistance: 12,
        odds: 2.5,
        lastStartTrack: 'Aqueduct Racetrack',
        lastStartDay: 'Saturday',
        startDate: new Date('1973-05-12')
    },
    {
        name: 'Seattle Slew',
        position: '1st',
        age: 3,
        total_earnings: 1170000,
        track: 'Belmont Park',
        raceDistance: 12,
        odds: 1.5,
        lastStartTrack: 'Belmont Park',
        lastStartDay: 'Saturday',
        startDate: new Date('1977-06-11')
    },
    {
        name: 'American Pharoah',
        position: '1st',
        age: 3,
        total_earnings: 8600000,
        track: 'Belmont Park',
        raceDistance: 12,
        odds: 1.5,
        lastStartTrack: 'Pimlico Race Course',
        lastStartDay: 'Saturday',
        startDate: new Date('2015-05-16')
    }
];

// add the horses to the database
export const addData = () => {
    Horse.insertMany(horses, function (error, docs) {
        if (error) {
            console.log('Error adding horses to database:', error);
        } else {
            console.log('Horses added to database:', docs);
        }
    });
}
