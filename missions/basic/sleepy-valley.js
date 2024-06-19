export function sleepyValley(array) {

    let rowCount = 0;

    for (let row of array) {
        let forestCount = row.filter(cell => cell === 'forest').length;

        if (forestCount === 3) {
            rowCount++;
        }
    }

    return rowCount * 4;
}



