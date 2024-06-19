export function borderland(array) {
    const rows = array.length;
    const cols = array[0].length;

    let rowCount = 0;
    let colCount = 0;

    for (let row = 0; row < rows; row++) {
        if (!array[row].includes(0)) {
            rowCount++;
        }
    }

    for (let col = 0; col < cols; col++) {
        let hasZero = false;
        for (let row = 0; row < rows; row++) {
            if (array[row][col] === 0) {
                hasZero = true;
                break;
            }
        }
        if (!hasZero) {
            colCount++;
        }
    }
    return (rowCount + colCount) * 6;
}
