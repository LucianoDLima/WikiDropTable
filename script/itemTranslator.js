function fetchTranslatedName(item, data) {
    const dataMap = new Map(data);
    return dataMap.get(item) || false;
}

function handleFetchData(item, lines, i, start, end, data) {
    if (item.includes(start)) {
        // Strips the item name from the table line.
        item = item.split(start);
        item = item[1].split(end);
        item = item[0].trim();

        const translatedName = fetchTranslatedName(item, data);
        if (translatedName) {
            lines[i] = lines[i].replace(item, translatedName);
        }
    }
}

export function translateItemNames(outputDrops, data) {
    let lines = outputDrops.value.split('\n');
    const symbolsToCheck = [
        ['=', '|'],
        ['=', '.png'],
        ['[[', ']'],
        ['Descobrir:', '|'],
        ['[[Arquivo:', '.png'],
        ['==', '==']
    ];

    for (let i = 0; i < lines.length; i++) {
        let item = lines[i];

        // Check if it has a name to be translated.
        symbolsToCheck.forEach(([start, end]) => {
            handleFetchData(item, lines, i, start, end, data);
        });
    }

    outputDrops.value = lines.join('\n');
};