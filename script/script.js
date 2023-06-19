import { dropTableHead, skillNames, infoboxItem, infoboxRecipe, summonPouch } from './parameters.js';
import { translateParameters } from './parameterTranslator.js';
import { translateItemNames } from './itemTranslator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');


inputDrops.addEventListener('input', () => {
    outputDrops.value = inputDrops.value;

    translateParameters(inputDrops, outputDrops, dropTableHead, skillNames, infoboxItem, infoboxRecipe, summonPouch)
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
