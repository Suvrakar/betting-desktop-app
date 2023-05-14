const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
  horseName: String,
  horseNumber: String,
  position: String,
  age: Number,
  total_earnings: String,
  track: String,
  raceDistance: String,
  raceNumber: String,
  odds: Number,
  lastStartTrack: String,
  lastStartDay: String,
  startDate: String,
  endDate: String,
  previousTrack: String,
  currentTrack: String,
  races: String,
  lastStartBeatenLengths: Number,
  lastStartBettingLine: Number,
  currentRaceDistance: String,
  lastStartLengths: String,
  currentRaceBettingPosition: String,
  lastStartDate: String,
});

const Horse = mongoose.model('Horse', horseSchema);

module.exports = Horse;
