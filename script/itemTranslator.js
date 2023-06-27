import { namesDataSet } from './items.js';

const symbolsToCheck = [
    ['nome=', '|'],
    ['image=', '.png'],
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
        const itemLower = item.toLowerCase();

        if (dataMap.has(itemLower)) {
            return line.replace(item, dataMap.get(itemLower));
        }
    }

    return line;
}

export function translateItemNames(text) {
    let lines = text.split('\n');
    const len = lines.length;

    for (const dataSet of namesDataSet) {       
        for (let i = 0; i < len; i++) {
            for (const [start, end] of symbolsToCheck) {
                lines[i] = fetchTranslatedName(lines[i], start, end, dataSet);
            }
        }
    }

    return lines.join('\n');
};