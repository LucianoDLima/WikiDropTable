import { activateButtons, handleTouchEvents, closeWindowOnClickOutside, showInterfaceFromHeaderButtons, handleGEInputSearch, handleHUWebsite, clearGEInputSearch, displaySearchResultsPage } from './searchScript';
import { translate } from './translator';

const inputTranslator: HTMLTextAreaElement = document.querySelector('[data-js="text-input"]')!;
const outputTranslator: HTMLTextAreaElement = document.querySelector('[data-js="text-output"]')!;
const copyButton: HTMLButtonElement | null = document.querySelector('[data-js="copy-button"]');
const copyIcon: HTMLImageElement | null = document.querySelector('[data-js="copy-button"]');
const copySuccess: HTMLImageElement | null = document.querySelector('[data-js="copy-success"]');
const delButton: HTMLButtonElement | null = document.querySelector('[data-js="delete-button"]');

inputTranslator.focus();

inputTranslator.addEventListener('input', (): void => {
    const translated = translate(inputTranslator.value);
    outputTranslator.value = translated;

    if (translated) {
        // Moves it to the side if there's a scrollbar active.
        copyButton?.classList.toggle(
            'textbox__button--active-scroll', 
            outputTranslator.clientHeight < outputTranslator.scrollHeight
        );
        delButton?.classList.toggle(
            'textbox__button--active-scroll', 
            inputTranslator.clientHeight < inputTranslator.scrollHeight
        );

        copyButton?.classList.remove('hidden');
        delButton?.classList.remove('hidden');
    } else {
        copyButton?.classList.add('hidden');
        delButton?.classList.add('hidden');
    }
});

copyButton?.addEventListener('focusout', () => {
    copySuccess?.classList.add('hidden');
    copyIcon?.classList.remove('hidden');
});

copyButton?.addEventListener('click', (): void => {
    navigator.clipboard
        .writeText(outputTranslator.value)
        .then((): void => {
            copyIcon?.classList.add('hidden');
            copySuccess?.classList.remove('hidden');
        })
        .catch((error): void => {
            console.error('Failed to copy text: ', error);
        });

    setTimeout((): void => {
        copySuccess?.classList.add('hidden');
        copyIcon?.classList.remove('hidden');
    }, 2500);
});

delButton?.addEventListener('click', (): void => {
    inputTranslator.value = outputTranslator.value = '';
    copyButton?.classList.add('hidden');
    delButton?.classList.add('hidden');
});

activateButtons();

showInterfaceFromHeaderButtons();

closeWindowOnClickOutside();

handleTouchEvents();

handleHUWebsite();

clearGEInputSearch();

handleGEInputSearch()

displaySearchResultsPage()
