import { itemNames, npcNames } from './items.js';

const namesDataSet = [
    itemNames,
    npcNames
];

const symbolsToCheck = [
    ['=', '|'],
    ['=', '.png'],
    ['[[', ']'],
    ['Descobrir:', '|'],
    ['[[Arquivo:', '.png'],
    ['==', '==']
];

function fetchTranslatedName(line, start, end, dataMap) {
    if (line.includes(start)) {
        // Strips the item name from the table line.
        let item = line.split(start);
        item = item[1].split(end);
        item = item[0].trim();

        if (dataMap.has(item)) {
            return line.replace(item, dataMap.get(item));
        }
    }

    return line;
}

export function translateItemNames(text) {
    let lines = text.split('\n');

    for (const dataSet of namesDataSet) {
        const dataMap = new Map(dataSet);
        
        const len = lines.length;
        for (let i = 0; i < len; i++) {
            for (const [start, end] of symbolsToCheck) {
                lines[i] = fetchTranslatedName(lines[i], start, end, dataMap);
            }
        }
    }

    return lines.join('\n');
};