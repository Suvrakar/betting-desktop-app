const mongoose = require("mongoose");
const Horse = require("./Horse");

mongoose.connect("mongodb+srv://dksuvra:01711536682Suv@cluster0.jtz012f.mongodb.net/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to database");

  const horse1 = new Horse({
    name: "Secretariat",
    position: "1st",
    age: 3,
    total_earnings: 1566472,
    track: "Belmont",
    raceDistance: "1.5 miles",
    odds: 1.5,
    lastStartTrack: "Churchill Downs",
    lastStartDay: "May 5, 1973",
    startDate: "June 9, 1970",
    endDate: "October 4, 1973",
    previousTrack: "Pimlico",
    currentTrack: "Belmont",
    races: "21:16-3-1",
    lastStartBeatenLengths: 0,
    lastStartBettingLine: 1,
    currentRaceDistance: "1.5 miles"
  }
  );

  const horse2 = new Horse({
    name: "Seabiscuit",
    position: "1st",
    age: 5,
    total_earnings: 437730,
    track: "Santa Anita",
    raceDistance: "1.25 miles",
    odds: 11,
    lastStartTrack: "Santa Anita",
    lastStartDay: "November 1, 1940",
    startDate: "January 1, 1938",
    endDate: "November 1, 1940",
    previousTrack: "Hollywood Park",
    currentTrack: "Santa Anita",
    races: "89:33-15-15",
    lastStartBeatenLengths: 2,
    lastStartBettingLine: 4,
    currentRaceDistance: "1.25 miles"
  });

  const horse3 = new Horse({
    name: "American Pharoah",
    position: "1st",
    age: 3,
    total_earnings: 8760834,
    track: "Belmont",
    raceDistance: "1.5 miles",
    odds: 0.5,
    lastStartTrack: "Pimlico",
    lastStartDay: "May 16, 2015",
    startDate: "February 2, 2015",
    endDate: "October 31, 2015",
    previousTrack: "Churchill Downs",
    currentTrack: "Belmont",
    races: "11:9-1-0",
    lastStartBeatenLengths: 0.5,
    lastStartBettingLine: 1,
    currentRaceDistance: "1.5 miles"
  });

  const horse4 = new Horse({
    name: "Man o' War",
    position: "1st",
    age: 3,
    total_earnings: 249465,
    track: "Belmont",
    raceDistance: "1.5 miles",
    odds: 1.2,
    lastStartTrack: "Belmont",
    lastStartDay: "September 15, 1920",
    startDate: "June 6, 1919",
    endDate: "November 1, 1920",
    previousTrack: "Saratoga",
    currentTrack: "Belmont",
    races: "21:20-1-0",
    lastStartBeatenLengths: 0,
    lastStartBettingLine: 1,
    currentRaceDistance: "1.5 miles"
  });

  const horse5 = new Horse({
    name: "American Pharoah",
    position: 1,
    age: 5,
    total_earnings: 8198000,
    track: "Belmont Park",
    raceDistance: "1.5 miles",
    odds: 1.5,
    lastStartTrack: "Keeneland",
    lastStartDay: "2021-09-28",
    startDate: "2021-10-28",
  });

  const horse6 = new Horse({
    name: "Citation",
    position: 1,
    age: 6,
    total_earnings: 155680,
    track: "Churchill Downs",
    raceDistance: "1 mile",
    odds: 2.0,
    lastStartTrack: "Hialeah Park Race Track",
    lastStartDay: "2021-11-20",
    startDate: "2021-12-20",
  });

  const horse7 = new Horse({
    name: "Affirmed",
    position: 1,
    age: 4,
    total_earnings: 2912000,
    track: "Hollywood Park Racetrack",
    raceDistance: "1.5 miles",
    odds: 2.0,
    lastStartTrack: "Race Track",
    lastStartDay: "2021-11-20",
    startDate: "2021-12-20",
  });


  try {
    await Horse.deleteMany({});
    await Horse.insertMany([horse1, horse2, horse3, horse4, horse5, horse6, horse7]);
    console.log("Dummy data added to database");
  } catch (error) {
    console.error(error);
  } finally {
    mongoose.connection.close();
    console.log("Disconnected from database");
  }
});
