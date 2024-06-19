export function richCountryside(array) {
    let richCounter = 0;

    for (let row of array) {

        let uniqueFields = new Set(row.filter(value => value !== 0));

        if (uniqueFields.size >= 5) {
            richCounter += 4;
        }
    }
    return richCounter;
}
