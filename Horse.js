const mongoose = require('mongoose');

const horseSchema = new mongoose.Schema({
  name: String,
  position: String,
  age: Number,
  total_earnings: Number,
  track: String,
  raceDistance: String,
  odds: Number,
  lastStartTrack: String,
  lastStartDay: String,
  startDate: Date,
  endDate: Date,
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
