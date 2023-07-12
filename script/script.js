import { translate } from './translator.js';

const inputTranslator = document.querySelector('#input');
const outputTranslator = document.querySelector('#output');

inputTranslator.addEventListener('input', () => {
    outputTranslator.value = translate(inputTranslator.value);
});

outputTranslator.addEventListener('click', () => {
    navigator.clipboard.writeText(outputDrops.value).catch((error) => {
        console.error('Failed to copy text: ', error);
    });
});
