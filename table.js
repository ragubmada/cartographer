import {elements} from "./utilities/elements.js";
import {missions} from "./utilities/missions.js";
import {
    rotate,
    getElem,
    getRowCol,
    showPreview,
    getElemsPos,
    countPoints,
    shuffleArray,
    refreshTable,
    setMissionCard,
    setMissionPoints,
    highlightSelection,
    updateMissionPoints,
    selectRandomMissions
} from "./utilities/functions.js";
import {
    seasons,
    mountains,
    missionPoints,
    surroundedMountain
} from "./utilities/helper-vars.js";


const table = document.querySelector("#game-container #table");

let mainArray = [];
const rows = 11;
const columns = 11;

let gameOver = false;
let currentSeason = 0;
let seasonTime = 7;

const currentTime = document.querySelector('#current-time span');
const seasonText = document.querySelector('#current-season span');

let elemArray = [...elements];
shuffleArray(elemArray);

let elemToPlace = getElem(elemArray, gameOver);

for (let i = 0; i < rows; i++) {
    mainArray[i] = [];
    for (let j = 0; j < columns; j++) {
        mainArray[i][j] = 0;
    }
}

for (const mountain of mountains) {
    const [row, col] = mountain;
    mainArray[row - 1][col - 1] = "mountain";
}
refreshTable(table, mainArray);

let selectedMissions = selectRandomMissions(missions, 4);
selectedMissions.push(surroundedMountain);

setMissionCard("A", selectedMissions[0]);
setMissionCard("B", selectedMissions[1]);
setMissionCard("C", selectedMissions[2]);
setMissionCard("D", selectedMissions[3]);
setMissionCard("Extra", selectedMissions[4]);

function setSeasons(newSeasons) {
    seasons = newSeasons;
}

function saveData() {
    if (!gameOver) {
        const data = {
            mainArray: mainArray,
            elemArray: elemArray,
            elemToPlace: elemToPlace,
            currentSeason: currentSeason,
            seasonTime: seasonTime,
            seasons: seasons,
            missions: selectedMissions,
            missionP: missionPoints
        }
        localStorage.setItem("saveData", JSON.stringify(data));
    } else {
        localStorage.removeItem("saveData");
    }
}

function loadData() {
    if (!gameOver) {
        const data = JSON.parse(localStorage.getItem("saveData"));

        mainArray = data.mainArray;
        elemArray = data.elemArray;
        elemToPlace = data.elemToPlace;
        currentSeason = data.currentSeason;
        seasonTime = data.seasonTime;
        setSeasons(data.seasons);
        selectedMissions = data.missions;
        updateMissionPoints(data.missionP);

        setMissionCard("A", selectedMissions[0]);
        setMissionCard("B", selectedMissions[1]);
        setMissionCard("C", selectedMissions[2]);
        setMissionCard("D", selectedMissions[3]);

        seasonText.innerText = seasons[currentSeason].hun;
        currentTime.innerText = `${seasonTime}/7`;

        for (let i = 0; i < currentSeason; i++) {
            const seasonScore = document.querySelector(`div[id='${i}'] span`);
            seasonScore.innerText = seasons[i].points;
        }
        refreshTable(table, mainArray);
    }
}

function showElems(event) {
    if (gameOver) {
        table.removeEventListener("mouseover", showElems);
        return;
    }

    if (event.target.matches("#table > div > div")) {
        const cell = event.target;
        cell.style.cursor = "pointer";
        let [rowInd, colInd] = getRowCol(cell);

        const elems = getElemsPos(elemToPlace, rowInd, colInd);

        highlightSelection(table, mainArray, elems, elemToPlace);
    }
}

function removeElems(event) {
    if (gameOver) {
        table.removeEventListener("mouseout", removeElems);
        return;
    }

    if (event.target.matches("#table > div > div")) {
        const cell = event.target;
        cell.style.cursor = "default";

        refreshTable(table, mainArray);
    }
}

function saveElems(event) {
    if (gameOver) {
        table.removeEventListener("click", saveElems);
        return;
    }

    if (event.target.matches("#table > div > div")) {
        const cell = event.target;
        let [rowInd, colInd] = getRowCol(cell);

        const elems = getElemsPos(elemToPlace, rowInd, colInd);

        const canElemBePlaced = elems.every(
            ([row, col]) =>
                row >= 0 &&
                row < rows &&
                col >= 0 &&
                col < columns &&
                mainArray[row][col] === 0
        );

        if (canElemBePlaced) {
            for (const [row, col] of elems) {
                mainArray[row][col] = elemToPlace.type;
            }

            seasonTime -= elemToPlace.time;
            currentTime.innerText = `${seasonTime}/7`;

            if (seasonTime <= 0 && currentSeason !== 3) {
                const seasonScore = document.querySelector(`div[id='${currentSeason}'] span`);
                seasons[currentSeason].points = countPoints(currentSeason, selectedMissions, mainArray, missionPoints);
                seasonScore.innerText = seasons[currentSeason].points;

                seasonTime = 7;
                currentSeason++;

                seasonText.innerText = seasons[currentSeason].hun;
                currentTime.innerText = `7/7`;

                elemArray = [...elements];
                shuffleArray(elemArray);
            }

            if (seasonTime <= 0 && currentSeason === 3) {
                const seasonScore = document.querySelector(`div[id='${currentSeason}'] span`);
                seasons[currentSeason].points = countPoints(currentSeason, selectedMissions, mainArray, missionPoints);
                seasonScore.innerText = seasons[currentSeason].points;

                const finalScore = document.querySelector("#score-info span")
                finalScore.innerText = seasons.reduce((sum, season) => sum + season.points, 0);

                setMissionPoints('A', missionPoints[0]);
                setMissionPoints('B', missionPoints[1]);
                setMissionPoints('C', missionPoints[2]);
                setMissionPoints('D', missionPoints[3]);
                setMissionPoints('Extra', missionPoints[4]);

                gameOver = true;
                currentTime.innerText = `0/7`;
            }

            refreshTable(table, mainArray);
            elemToPlace = getElem(elemArray, gameOver);
            showPreview(gameOver, elemToPlace);
            saveData();
        }
    }
}

function mirrorElem(event) {
    if (event.target.matches("button#mirror")) {
        elemToPlace.mirrored = !elemToPlace.mirrored;
        elemToPlace.shape = elemToPlace.shape.map(row => row.reverse());
    }
    showPreview(gameOver, elemToPlace);
    saveData();
}

function rotateElem(event) {
    if (event.target.matches("button#rotate")) {
        elemToPlace = rotate(1, elemToPlace);
    }
    showPreview(gameOver, elemToPlace);
    saveData();
}

if (localStorage.getItem("saveData") !== null) loadData();
showPreview(gameOver, elemToPlace);

const mirrorButton = document.querySelector("#mirror");
mirrorButton.addEventListener("click", mirrorElem);

const rotateButton = document.querySelector("#rotate")
rotateButton.addEventListener("click", rotateElem);

const endGameButton = document.querySelector("#new-game")
endGameButton.addEventListener("click", () => {
    localStorage.removeItem("saveData");
    location.reload()
});

table.addEventListener("mouseover", showElems);
table.addEventListener("mouseout", removeElems);
table.addEventListener("click", saveElems);
