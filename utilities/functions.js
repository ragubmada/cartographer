import {borderland} from "../missions/basic/borderland.js";
import {sleepyValley} from "../missions/basic/sleepy-valley.js";
import {potatoWatering} from "../missions/basic/potato-watering.js";
import {edgeForest} from "../missions/basic/edge-forest.js";
import {surroundedMountain} from "../missions/surrounded-mountain.js";
import {emptyPlot} from "../missions/extra/empty-plot.js";
import {magicianValley} from "../missions/extra/magician-valley.js";
import {oddSilos} from "../missions/extra/odd-silos.js";
import {treeRow} from "../missions/extra/tree-row.js";
import {richTown} from "../missions/extra/rich-town.js";
import {irrigationCanal} from "../missions/extra/irrigation-canal.js";
import {terracedHouse} from "../missions/extra/terraced-house.js";
import {richCountryside} from "../missions/extra/rich-countryside.js";
import {missionPoints} from "./helper-vars";


export function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export function getElem(array, gameOver) {
    if (!gameOver) {
        return array.shift();
    }
}

export function getElems(elem) {
    const elems = [];

    for (let rowInd = 0; rowInd < elem.shape.length; rowInd++) {
        const row = elem.shape[rowInd];

        for (let colInd = 0; colInd < row.length; colInd++) {
            const col = row[colInd];

            if (col) {
                elems.push([rowInd, colInd]);
            }
        }
    }
    return elems;
}

export function findClosestElem(elem) {
    const closestRow = elem.shape.findIndex(row => row.includes(1));
    const closestCol = elem.shape[closestRow].indexOf(1);

    return [closestRow, closestCol];
}

export function getElemsPos(elem, rowInd, colInd) {
    const newElems = [];
    const elems = getElems(elem);

    for (let i = 0; i < elems.length; i++) {
        const [row, col] = elems[i];

        const newRowInd = rowInd + row - findClosestElem(elem)[0];
        const newColInd = colInd + col - findClosestElem(elem)[1];

        newElems.push([newRowInd, newColInd]);
    }
    return newElems;
}

export function getRowCol(cell) {
    const cellRow = Array.from(cell.parentNode.children).indexOf(cell);
    const cellCol = Array.from(cell.parentNode.parentNode.children).indexOf(cell.parentNode);

    return [cellRow, cellCol];
}

export function updateTable(table, array, row, col, elem) {
    const selectCol = table.querySelector(`#table > div:nth-child(${col + 1})`)
    const selectRow = selectCol.querySelector(`div > div:nth-child(${row + 1})`)

    if (array[row][col] === 0) {
        selectRow.style.backgroundImage = `url("./assets/tiles/${elem.type}_tile.svg")`;
    } else {
        selectRow.style.backgroundImage = `url("./assets/tiles/error_tile.png")`;
    }
    selectRow.style.backgroundSize = "cover";
}

export function refreshTable(table, array) {
    for (let row = 0; row < array.length; row++) {
        for (let col = 0; col < array[row].length; col++) {
            const selectCol = table.querySelector(`#table > div:nth-child(${col + 1})`)
            const selectRow = selectCol.querySelector(`div > div:nth-child(${row + 1})`)
            if (array[row][col] !== 0) {
                selectRow.style.backgroundImage = `url("./assets/tiles/${array[row][col]}_tile.svg")`;
                selectRow.style.backgroundSize = "cover";
            } else {
                selectRow.style.backgroundImage = null;
            }
        }
    }
}

export function highlightSelection(table, array, elems, elemToPlace) {
    for (let i = 0; i < elems.length; i++) {
        const [row, col] = elems[i];

        if (row <= 10 && row >= 0 && col <= 10 && col >= 0) {
            updateTable(table, array, row, col, elemToPlace)
        }
    }
}

export function rotate(n, elem) {
    const rows = elem.shape.length;
    const cols = elem.shape[0].length;

    for (let i = 0; i < n; i++) {
        const copyMatrix = elem.shape.map(row => [...row]);

        elem.rotation += 90;
        elem.rotation %= 360;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                elem.shape[row][col] = copyMatrix[cols - col - 1][row];
            }
        }
    }
    return elem;
}

export function showPreview(gameOver, elem) {
    if (!gameOver) {
        for (let row = 0; row < elem.shape.length; row++) {
            for (let col = 0; col < elem.shape[row].length; col++) {
                const selectCol = document.querySelector(`div#preview > div:nth-child(${col + 1})`)
                const selectRow = selectCol.querySelector(`div > div:nth-child(${row + 1})`)

                if (elem.shape[row][col] === 1) {
                    selectRow.style.backgroundImage = `url("./assets/tiles/${elem.type}_tile.svg")`;
                    selectRow.style.backgroundSize = "cover";
                } else {
                    selectRow.style.backgroundImage = null;
                }
            }
        }

        const elemTime = document.querySelector("div#element-info p");
        elemTime.innerText = `${elem.time} időegység`;

    } else {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const selectCol = document.querySelector(`div#preview > div:nth-child(${col + 1})`)
                const selectRow = selectCol.querySelector(`div > div:nth-child(${row + 1})`)
                selectRow.style.backgroundImage = null;
            }
        }
    }
}

export function setMissionCard(cardId, mission) {
    if (cardId !== 'Extra') {
        const imgElement = document.querySelector(`div#${cardId} img`);
        imgElement.src = `./assets/mission/${mission.title}.png`;
        imgElement.alt = mission.description;
        imgElement.width = 400;
        imgElement.height = 100;

    } else {
        const missionCard = document.querySelector(`div#${cardId} span`);
        missionCard.innerHTML = `${cardId}) ${mission.title} <br> ${mission.description}`;
    }
}

export function setMissionPoints(cardId, points) {
    if (cardId !== 'Extra') {
        const missionPoints = document.querySelector(`#${cardId} span`);
        missionPoints.innerText = ` ${points} pont`;
    } else {
        const missionPoints = document.querySelector(`#${cardId} span:nth-child(2)`);
        missionPoints.innerText = ` ${points} pont`;
    }
}

export function updateMissionPoints(newMissionPoints) {
    missionPoints = newMissionPoints;
}

export function selectRandomMissions(missions, count) {
    const allMissions = [...missions.basic, ...missions.extra];
    const selectedMissions = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * allMissions.length);
        selectedMissions.push(allMissions[randomIndex]);
        allMissions.splice(randomIndex, 1);
    }
    return selectedMissions;
}

export function countPoints(season, missions, array, missionPoints) {
    let points = 0;
    let firstMission = 0;
    let secondMission = 1;

    switch (season) {
        case 1:
            firstMission = 1;
            secondMission = 2;
            break;
        case 2:
            firstMission = 2;
            secondMission = 3;
            break;
        case 3:
            firstMission = 3;
            secondMission = 0;
            break;
        default:
            break;
    }

    const firstFun = findMission(missions[firstMission].title);
    const secondFun = findMission(missions[secondMission].title);

    const first = firstFun(array);
    const second = secondFun(array);
    const valueSM = surroundedMountain(array);

    missionPoints[firstMission] += first;
    missionPoints[secondMission] += second;
    missionPoints[4] += valueSM;

    points += first;
    points += second;
    points += valueSM;

    return points;
}

export function findMission(name) {
    let fun = undefined;

    switch (name) {
        case "Az erdő széle":
            fun = edgeForest;
            break;
        case "Álmos-völgy":
            fun = sleepyValley;
            break;
        case "Krumpliöntözés":
            fun = potatoWatering;
            break;
        case "Határvidék":
            fun = borderland;
            break;
        case "Fasor":
            fun = treeRow;
            break;
        case "Gazdag város":
            fun = richTown;
            break;
        case "Öntözőcsatorna":
            fun = irrigationCanal;
            break;
        case "Mágusok völgye":
            fun = magicianValley;
            break;
        case "Üres telek":
            fun = emptyPlot;
            break;
        case "Sorház":
            fun = terracedHouse;
            break;
        case "Páratlan silók":
            fun = oddSilos;
            break;
        case "Gazdag vidék":
            fun = richCountryside;
            break;
        default:
            break;
    }

    return fun;
}
