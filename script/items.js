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

const fetchTranslatedName = (item, data) => {
    const dataLength = data.length;
    for (let i = 0; i < dataLength; i++) {
        if (data[i][0].toLowerCase() === item) {
            return data[i][1];
        }
    }
    return false;
};

export function handleFetchData(item, lines, i, start, end, data) {
    if (item.indexOf(start) != -1) {
      item = item.split(start);
      item = item[1].split(end);
      item = item[0].trim();
  
      const translatedName = fetchTranslatedName(item.toLowerCase(), data);
      if (translatedName) {
        // Replace the item name with the translated name.
        lines[i] = lines[i].replace(item, translatedName);
      }
    }
  }