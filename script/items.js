try {
    const response = await fetch('./data/data.json');
    var itemNames = await response.json(); 
} catch (error) {
    console.error('Error loading JSON file:', error);
}

export const fetchTranslatedName = (item) => {
    const itemNamesLength = itemNames.length;
    for (let i = 0; i < itemNamesLength; i++) {
        if (itemNames[i][0].toLowerCase() === item) {
            return itemNames[i][1];
        }
    }
    return false;
};