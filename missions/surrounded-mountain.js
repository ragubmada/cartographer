export function surroundedMountain(array) {
    const rows = array.length;
    const cols = array[0].length;
    let mCount = 0;

    function isSurrounded(row, col) {
        return (
            array[row][col] === 'mountain' &&
            row > 0 && array[row - 1][col] !== 0 &&
            row < rows - 1 && array[row + 1][col] !== 0 &&
            col > 0 && array[row][col - 1] !== 0 &&
            col < cols - 1 && array[row][col + 1] !== 0
        );
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (isSurrounded(row, col)) {
                mCount++;
            }
        }
    }
    return mCount;
}
