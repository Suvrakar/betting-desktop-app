const { ipcRenderer, dialog } = require("electron");

const tableEl = document.getElementById("horse-table");
const topTableEl = document.getElementById("top-horse-table");
const topTableE2 = document.getElementById("last-start-horse-table");
const topTableE3 = document.getElementById("last-start-distance-horse-table");
const topTableE4 = document.getElementById("beatenBy-lessthan-6-table");
const topTableE5 = document.getElementById("last-28-table");
const topTableE6 = document.getElementById("australian-horses-table");



const showButton = document.getElementById("show-button");
const topButton = document.getElementById("top-button");
const topMetroButton = document.getElementById("top-metro-button");
const lastStartonSaturday = document.getElementById("last-start-saturday");
const lastStartonDistance = document.getElementById("last-start-placed");
const betanbyless6Distance = document.getElementById("beatenBy-lessthan-6");
const last28Days = document.getElementById("last-28");
const austrlianRaces = document.getElementById("austrlian-races");


const renderHorses = (horses, tableId) => {
  const tableHeader = `<tr>
    <th>Name</th>
    <th>Position</th>
    <th>Age</th>
    <th>Total Earnings</th>
    <th>Track</th>
    <th>Race Distance</th>
    <th>Odds</th>
    <th>Last Start Track</th>
    <th>Last Start Day</th>
    <th>Start Date</th>
  </tr>`;
  let tableBody = "";
  horses.forEach((horse) => {
    tableBody += `<tr>
      <td>${horse.name}</td>
      <td>${horse.position}</td>
      <td>${horse.age}</td>
      <td>${horse.total_earnings}</td>
      <td>${horse.track}</td>
      <td>${horse.raceDistance}</td>
      <td>${horse.odds}</td>
      <td>${horse.lastStartTrack}</td>
      <td>${horse.lastStartDay}</td>
      <td>${horse.startDate}</td>
    </tr>`;
  });

  if (tableId === "horse-table") {
    tableEl.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  } else if (tableId === "top-horse-table") {
    topTableEl.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
  else if (tableId == "last-start-horse-table") {
    topTableE2.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
  else if (tableId == "last-start-distance-horse-table") {
    topTableE2.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
  else if (tableId == "beatenBy-lessthan-6-table") {
    topTableE4.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
  else if (tableId == "last-28-table") {
    topTableE5.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
  else if (tableId == "australian-horses-table") {
    topTableE6.innerHTML = `<table>${tableHeader}${tableBody}</table>`;
  }
};

showButton.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getHorses");
});

topButton.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getTopHorses");
});

topMetroButton.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getTopMetroHorses");
});

lastStartonSaturday.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getHorsesWithSameTrackAndDay");
});

lastStartonDistance.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getHorsesWithLastDistanceWinOrPlace");
});

betanbyless6Distance.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getBeatenLessThanSixLengths");
});

last28Days.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getHorsesLastStartWithin28Days");
});

austrlianRaces.addEventListener("click", () => {
  topTableEl.innerHTML = "";
  tableEl.innerHTML = "";
  topTableE2.innerHTML = "";
  topTableE3.innerHTML = "";
  topTableE4.innerHTML = "";
  topTableE5.innerHTML = "";
  topTableE6.innerHTML = "";
  ipcRenderer.send("getAustralianRaces");
});



//Renderer Functions

//All Horse Data
ipcRenderer.on("horsesData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "horse-table");
  console.log(receivedHorses);
});

//Top 6 horses
ipcRenderer.on("topHorsesData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "top-horse-table");
  console.log(receivedHorses);
});

//Top Metro Horse Data
ipcRenderer.on("topMetroHorsesData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "top-metro-horse-table");
  console.log(receivedHorses);
});


//last start on a Saturday at the same track as their current race
ipcRenderer.on("horsesWithSameTrackAndDay", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "last-start-horse-table");
  console.log(receivedHorses);
});


//horsesWithLastDistanceWinOrPlaceData
ipcRenderer.on("horsesWithLastDistanceWinOrPlaceData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "last-start-distance-horse-table");
  console.log(receivedHorses);
});


//Beaten by 6 lengths or less
ipcRenderer.on("getBeatenLessThanSixLengthsData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "beatenBy-lessthan-6-table");
  console.log(receivedHorses);
});

//Get horsesLastStartWithin28DaysData
ipcRenderer.on("horsesLastStartWithin28DaysData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "last-28-table");
  console.log(receivedHorses);
});


//Get Australian Horses
ipcRenderer.on("AustralianRacesData", (event, horses) => {
  const receivedHorses = JSON.parse(horses);
  renderHorses(receivedHorses, "australian-horses-table");
  console.log(receivedHorses);
});








