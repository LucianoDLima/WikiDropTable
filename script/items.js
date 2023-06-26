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