import * as tp from './parameters.js';
import { translateParameters } from './parameterTranslator.js';
import { translateItemNames } from './itemTranslator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

// It looks for the appropriate template to translate based on some key words.
function handleInput() {
    const inputContent = inputDrops.value;
    const lines = inputContent.split('\n');

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        let caseFound = false; 

        switch (line) {
            case '{{Infobox familiar':
            case '{{Infobar Summon Pouch':
            case '{{Infobox Summoning scroll':
                translateParameters(inputDrops, outputDrops, tp.infoboxSummoning);
                caseFound = true;
                break;

            case '{{infobox item':
                translateParameters(inputDrops, outputDrops, tp.infoboxItem);
                caseFound = true;
                break;
            
            case '==Creation==':
            case 'Infobox Recipe':
                translateParameters(inputDrops, outputDrops, tp.infoboxRecipe, tp.skillNames);
                caseFound = true;
                break;
                
            case '===Main drops===':
            case '===Secondary drops===':
            case '{{DropsTableHead}}':
                translateParameters(inputDrops, outputDrops, tp.dropTableHead);
                caseFound = true;
                break;
            
            case '==Update history==':
            case '{{UH|':
                translateParameters(inputDrops, outputDrops, tp.updateHistory);
                caseFound = true;
                break;
        }

        if (caseFound) {
            break; 
        }

        translateParameters(inputDrops, outputDrops, tp.dropTableHead, tp.infoboxItem, tp.infoboxRecipe, tp.infoboxSummoning, tp.updateHistory, tp.skillNames);
    }
}



inputDrops.addEventListener('input', () => {
    outputDrops.value = inputDrops.value;
    
    handleInput()
    translateItemNames(outputDrops);
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
