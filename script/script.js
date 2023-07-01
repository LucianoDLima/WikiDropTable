
import { translate } from './translator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

inputDrops.addEventListener('input', () => {    
    outputDrops.value = translate(inputDrops.value);
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