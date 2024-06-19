export function oddSilos(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;

    let count = 0;

    for (let col = 0; col < cols; col += 2) {
        let hasZero = false;

        for (let row = 0; row < rows; row++) {
            if (matrix[row][col] === 0) {
                hasZero = true;
                break;
            }
        }

        if (!hasZero) {
            count++;
        }
    }

    return count * 10;
}
