
import { translateParameters } from './parameterTranslator.js';
import { translateItemNames } from './itemTranslator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

inputDrops.addEventListener('input', () => {    
    outputDrops.value = translateParameters(inputDrops.value);
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