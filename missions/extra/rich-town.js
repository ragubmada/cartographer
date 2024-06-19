export function richTown(array) {
    const rows = array.length;
    const cols = array[0].length;

    let townCount = 0;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (array[row][col] === 'town') {
                let types = new Set();

                if (col > 0 && array[row][col - 1] !== 0) {
                    types.add(array[row][col - 1]);
                }

                if (col < cols - 1 && array[row][col + 1] !== 0) {
                    types.add(array[row][col + 1]);
                }

                if (row > 0 && array[row - 1][col] !== 0) {
                    types.add(array[row - 1][col]);
                }

                if (row < rows - 1 && array[row + 1][col] !== 0) {
                    types.add(array[row + 1][col]);
                }

                if (types.size >= 3) {
                    townCount++;
                }
            }
        }
    }

    return townCount * 3;
}
