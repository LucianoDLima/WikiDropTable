try {
    const response = await fetch('data.json');
    var itemNames = await response.json(); 
} catch (error) {
    console.error('Error loading JSON file:', error);
}

export const indexOf2D = (item) => {
    for (let i = 0; i < itemNames.length; i++) {
        if (itemNames[i][0] == item) {
            return itemNames.indexOf(itemNames[i])
        }
    }
    return false;
};

export const fetchTranslatedName = (index) => {
    return itemNames[index][1];
};