const { app, BrowserWindow, ipcMain } = require("electron");
const mongoose = require("mongoose");
const Horse = require("./Horse");
const { Scrapper } = require("./Scrapper")

let mainWindow;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile("index.html");

  connectToDatabase();
});


async function connectToDatabase() {
  const DB_URI =
    "mongodb+srv://dksuvra:01711536682Suv@cluster0.jtz012f.mongodb.net/test";
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database.");
  } catch (err) {
    console.error(err);
  }
}


ipcMain.on("scrapper", async (event) => {
  event.reply("horsesData", []);
  await Scrapper();
});

ipcMain.on("getHorses", async (event) => {
  try {
    // query all horses in the database
    const horses = await Horse.find({});
    console.log("horses", horses);
    const success = event.reply("horsesData", JSON.stringify(horses));
    console.log("Reply sent successfully:", success);
  } catch (error) {
    console.error(error);
    event.reply("horsesData", []);
  }
});

// query top 6 horses by average earnings
ipcMain.on("getTopHorses", async (event) => {
  try {
    const horses = await Horse.find().sort({ total_earnings: -1 }).limit(6);

    console.log("Top horses:", horses);
    const success = event.reply("horsesData", JSON.stringify(horses));
    console.log("Reply sent successfully:", success);
  } catch (error) {
    console.error(error);
    event.reply("horsesData", []);
  }
});

// query horses with last start at Metropolitan track on a Saturday
ipcMain.on("getTopMetroHorses", async (event) => {
  try {
    const horses = await Horse.find({
      lastStartTrack: "Metropolitan",
      lastStartDay: { $regex: /^Saturday/ },
    }).limit(6);
    console.log("Top horses:", horses);
    event.reply("horsesData", JSON.stringify(horses));
  } catch (error) {
    console.error(error);
    event.reply("horsesData", []);
  }
});



//Get Horse with same track and day
ipcMain.on('getHorsesWithSameTrackAndDay', async (event) => {
  try {
    // Assuming you have a variable named 'currentTrackValue' that holds the current track value
    const currentTrackValue = 'Aus';

    const horses = await Horse.find({
      previousTrack: currentTrackValue,
      lastStartDay: 'Saturday',
    }).exec();
    console.log("Top getHorsesWithSameTrackAndDay:", horses);
    event.reply('horsesData', JSON.stringify(horses));
  } catch (err) {
    console.error(err);
    event.reply('horsesData', []);
  }
});



//Get Horses With Last DistanceWinOrPlace
ipcMain.on("getHorsesWithLastDistanceWinOrPlace", async (event) => {
  try {
    const horses = await Horse.find({
      position: { $in: ["1st", "2nd", "3rd"] }
    }).exec();
    console.log("Horses with last distance win or place:", horses);
    event.reply("horsesData", JSON.stringify(horses));
  } catch (error) {
    console.log(error);
    event.reply("horsesData", JSON.stringify({ error: "An error occurred while getting horses data." }));
  }
});


//horses that were beaten by less than 6 lengths in their last start and were in the top 6 lines of betting.
ipcMain.on("getBeatenLessThanSixLengths", async (event) => {
  try {
    const horses = await Horse.find({
      lastStartLengths: 6,
      currentRaceBettingPosition: 6
    }).exec();
    console.log("Top getBeatenLessThanSixLengths:", horses);
    event.reply("horsesData", JSON.stringify(horses));
  } catch (error) {
    console.log(error);
    event.reply("horsesData", JSON.stringify({ error: "An error occurred while getting horses data." }));
  }
});


//horses that were beaten by less than 6 lengths in their last start and were in the top 6 lines of betting.
ipcMain.on('getHorsesLastStartWithin28Days', async (event) => {
  try {
    const horses = await Horse.find({
      lastStartDate: "11/06/2023",
      // lastStartDate: { $gte: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000) }
    }).exec();
    console.log("Horses last started within 28 days:", horses);
    event.reply('horsesData', JSON.stringify(horses));
  } catch (err) {
    console.error(err);
    event.reply('horsesData', []);
  }
});


//filters the Australian races with 8 horses or more.
ipcMain.on('getAustralianRaces', async (event) => {
  try {
    const horses = await Horse.find({
      $or: [
        { races: "Australia" },
        { races: "australia" },
        { races: "Australian" },
        { races: "australian" },
      ]
    }).limit(8).exec();
    console.log("Australian races:", horses);
    event.reply('horsesData', JSON.stringify(horses));
  } catch (err) {
    console.error(err);
    event.reply('horsesData', []);
  }
});




