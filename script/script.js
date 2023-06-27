import * as tp from './parameters.js';
import { translateParameters } from './parameterTranslator.js';
import { translateItemNames } from './itemTranslator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

const monsterAndNpc = {
    ...tp.infoboxMonster,
    ...tp.infoboxNPC
}

const recipeSkillNames = {
    ...tp.infoboxRecipe,
    ...tp.skillNames
}

const allTemplates = {
    ...tp.dropTableHead,
    ...tp.infoboxItem,
    ...tp.infoboxRecipe,
    ...tp.skillNames,
    ...tp.updateHistory,
    ...tp.infoboxSummoning,
    ...tp.infoboxMonster,
    ...tp.infoboxNPC
}

function handleParameters(inputText) {
    switch (true) {
        case inputText.includes('{{Infobox Monster new'):
        case inputText.includes('{{Infobox NPC'):
            return translateParameters(inputText, monsterAndNpc);
        
        case inputText.includes('{{Infobox familiar'):
        case inputText.includes('{{Infobar Summon Pouch'):
        case inputText.includes('{{Infobox Summon scroll'):
            return translateParameters(inputText, tp.infoboxSummoning);

        case inputText.includes('{{infobox item'):
            return translateParameters(inputText, tp.infoboxItem);
        
        case inputText.includes('==Creation=='):
        case inputText.includes('Infobox Recipe'):
            return translateParameters(inputText, recipeSkillNames);
            
        case inputText.includes('===Main drops==='):
        case inputText.includes('===Secondary drops==='):
        case inputText.includes('{{DropsTableHead}}'):
            return translateParameters(inputText, tp.dropTableHead);
        
        case inputText.includes('==Update history=='):
        case inputText.includes('{{UH|'):
            return translateParameters(inputText, tp.updateHistory);
    }
        
    return translateParameters(inputText, allTemplates);
}

inputDrops.addEventListener('input', () => {    
    outputDrops.value = handleParameters(inputDrops.value);
    outputDrops.value = translateItemNames(outputDrops.value);
});

outputDrops.addEventListener('click', () => {
    outputDrops.select();
    document.execCommand('copy');

    // Unselect it all after copying
    const selection = window.getSelection();
    selection.removeAllRanges();

    setTimeout(() => {
        outputDrops.textContent = outputDrops.value;
    }, 1500);
});