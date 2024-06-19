export function magicianValley(array) {
    const rows = array.length;
    const cols = array[0].length;

    let waterCount = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (array[row][col] === 'mountain') {

                if (col > 0 && array[row][col - 1] === 'water') {
                    waterCount += 3;
                }

                if (col < cols - 1 && array[row][col + 1] === 'water') {
                    waterCount += 3;
                }

                if (row > 0 && array[row - 1][col] === 'water') {
                    waterCount += 3;
                }

                if (row < rows - 1 && array[row + 1][col] === 'water') {
                    waterCount += 3;
                }
            }
        }
    }

    return waterCount;
}
