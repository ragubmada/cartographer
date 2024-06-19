export function emptyPlot(array) {
    const rows = array.length;
    const cols = array[0].length;

    let emptyCount = 0;
    const checkedPositions = new Set();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {

            if (array[row][col] === 'town') {

                if (col > 0 && array[row][col - 1] === 0 && !checkedPositions.has(`${row}-${col - 1}`)) {
                    emptyCount += 2;
                    checkedPositions.add(`${row}-${col - 1}`);
                }

                if (col < cols - 1 && array[row][col + 1] === 0 && !checkedPositions.has(`${row}-${col + 1}`)) {
                    emptyCount += 2;
                    checkedPositions.add(`${row}-${col + 1}`);
                }

                if (row > 0 && array[row - 1][col] === 0 && !checkedPositions.has(`${row - 1}-${col}`)) {
                    emptyCount += 2;
                    checkedPositions.add(`${row - 1}-${col}`);
                }

                if (row < rows - 1 && array[row + 1][col] === 0 && !checkedPositions.has(`${row + 1}-${col}`)) {
                    emptyCount += 2;
                    checkedPositions.add(`${row + 1}-${col}`);
                }
            }
        }
    }

    return emptyCount;
}
