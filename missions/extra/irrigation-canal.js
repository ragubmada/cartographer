export function irrigationCanal(array) {
    const rows = array.length;
    const cols = array[0].length;

    let counter = 0;

    for (let col = 0; col < cols; col++) {
        let waterCount = 0;
        let farmCount = 0;

        for (let row = 0; row < rows; row++) {
            if (array[row][col] === 'water') waterCount++;
            if (array[row][col] === 'farm') farmCount++;
        }

        if (waterCount > 0 && farmCount > 0) {
            if (waterCount === farmCount) {
                counter += 4;
            }
        }
    }

    return counter;
}
