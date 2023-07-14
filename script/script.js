import { translate } from './translator.js';

const inputTranslator = document.querySelector('#input');
const outputTranslator = document.querySelector('#output');
const copyButton = document.getElementById('copy-button');
const copyIcon = document.getElementById('copy-icon');
const copySucess = document.getElementById('copy-success');

inputTranslator.addEventListener('input', () => {
    const translated = translate(inputTranslator.value);
    outputTranslator.value = translated;

    if (translated) {
        // Moves it to the side if there's a scrollbar active.
        copyButton.classList.toggle(
            'copy-button--active-scroll', 
            outputTranslator.clientHeight < outputTranslator.scrollHeight
        );
        
        copyButton.classList.remove('hidden');
    } else {
        copyButton.classList.add('hidden');
    }

});

copyButton.addEventListener('focusout', () => {
    copySucess.classList.add('hidden');
    copyIcon.classList.remove('hidden');
});

copyButton.addEventListener('click', () => {
    navigator.clipboard
        .writeText(outputTranslator.value)
        .then(() => {
            copyIcon.classList.add('hidden');
            copySucess.classList.remove('hidden');
        })
        .catch((error) => {
            console.error('Failed to copy text: ', error);
        });
});