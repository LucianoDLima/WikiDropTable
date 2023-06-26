export let itemNames;
export let npcNames;

try {
    const responseItem = await fetch('./data/dataItems.json');
    itemNames = await responseItem.json(); 

    const responseNpc = await fetch('./data/dataNPCs.json');
    npcNames = await responseNpc.json(); 
} catch (error) {
    console.error('Error loading JSON file:', error);
}

function fetchTranslatedName(item, data) {
    const dataMap = new Map(data);
    return dataMap.get(item) || false;
}

export function handleFetchData(item, lines, i, start, end, data) {
    if (item.includes(start)) {
        // Strips the item name from the DropsLine.
        item = item.split(start);
        item = item[1].split(end);
        item = item[0].trim();

        const translatedName = fetchTranslatedName(item, data);
        if (translatedName) {
            lines[i] = lines[i].replace(item, translatedName);
        }
    }
}