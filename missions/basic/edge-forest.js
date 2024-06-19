export function edgeForest(array) {

    const rows = array.length;
    const cols = array[0].length;
    let forestCount = 0;

    function isEdgeForest(row, col) {
        return array[row][col] === 'forest' &&
            (row === 0 || row === rows - 1 || col === 0 || col === cols - 1);
    }

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (isEdgeForest(row, col)) {
                forestCount++;
            }
        }
    }

    return forestCount;
}
