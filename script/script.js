
import { translate } from './translator.js';

const inputDrops = document.querySelector('#input');
const outputDrops = document.querySelector('#output');

inputDrops.addEventListener('input', () => {    
    outputDrops.value = translate(inputDrops.value);
});

outputDrops.addEventListener('click', () => {
    navigator.clipboard.writeText(
        outputDrops.value
    ).catch((error) => {
        console.error('Failed to copy text: ', error);
    });
});