const { ipcRenderer, dialog } = require("electron");

const tableEl = document.getElementById("horse-table");
const topTableEl = document.getElementById("top-horse-table");
const topTableE2 = document.getElementById("last-start-horse-table");
const topTableE3 = document.getElementById("last-start-distance-horse-table");
const topTableE4 = document.getElementById("beatenBy-lessthan-6-table");
const topTableE5 = document.getElementById("last-28-table");
const topTableE6 = document.getElementById("australian-horses-table");


const scrapperButton = document.getElementById("refresh-data");
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
    <th>Horse Name</th>
    <th>Horse Number</th>
    <th>Avg. Earnings</th>
  </tr>`;
  let tableBody = "";
  horses.forEach((horse) => {
    tableBody += `<tr>
      <td>${horse.horseName}</td>
      <td>${horse.horseNumber}</td>
      <td>${horse.total_earnings}</td>
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

scrapperButton.addEventListener("click", () => {
  ipcRenderer.send("scrapper");
});


showButton.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);

  ipcRenderer.send("getHorses");
});



topButton.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }

  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);

  ipcRenderer.send("getTopHorses");
});

topMetroButton.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
  ipcRenderer.send("getTopMetroHorses");
});

lastStartonSaturday.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
  ipcRenderer.send("getHorsesWithSameTrackAndDay");
});

lastStartonDistance.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
  ipcRenderer.send("getHorsesWithLastDistanceWinOrPlace");
});

betanbyless6Distance.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
  ipcRenderer.send("getBeatenLessThanSixLengths");
});

last28Days.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
  ipcRenderer.send("getHorsesLastStartWithin28Days");
});

austrlianRaces.addEventListener("click", () => {
  const tablesToClear = [topTableEl, tableEl, topTableE2, topTableE3, topTableE4, topTableE5, topTableE6];
  for (let table of tablesToClear) {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  }
  const tempMsgEl = document.createElement("tr");
  tempMsgEl.innerHTML = "<td colspan='3'>Please Wait...</td>";
  tableEl.appendChild(tempMsgEl);
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








