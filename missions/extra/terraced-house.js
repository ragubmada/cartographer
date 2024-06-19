export function terracedHouse(array) {

    let houseCounter = 0;
    let maxStreak = 0;

    for (let i = 0; i < array.length; i++) {
        let currentStreak = 0;
        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === 'town') {
                currentStreak++;
                if (currentStreak > maxStreak) {
                    maxStreak = currentStreak;
                }
            } else {
                currentStreak = 0;
            }
        }
    }

    for (let i = 0; i < array.length; i++) {

        let currentStreak = 0;

        for (let j = 0; j < array[i].length; j++) {
            if (array[i][j] === 'town') {
                currentStreak++;
                if (currentStreak === maxStreak) houseCounter += maxStreak * 2;
            } else {
                currentStreak = 0;
            }
        }
    }

    return houseCounter;
}
