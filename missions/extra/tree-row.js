export function treeRow(array) {
    const rows = array.length;
    const cols = array[0].length;

    let maxCount = 0;
    let count = 0;

    for (let j = 0; j < cols; j++) {
        for (let i = 0; i < rows; i++) {
            if (array[i][j] === 'forest') {
                count++;
            } else {
                if (count > maxCount) {
                    maxCount = count;
                }
                count = 0;
            }
        }
        if (count > maxCount) {
            maxCount = count;
        }
        count = 0;
    }

    return maxCount * 2;
}
