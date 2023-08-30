import { currentMode } from "./colorMode";

const porButton: HTMLInputElement = document.getElementById('pt-button') as HTMLInputElement;
const engButton: HTMLInputElement = document.getElementById('en-button') as HTMLInputElement;
const geInput: HTMLInputElement = document.querySelector('[data-search="input"]')!;

const portugueseText: NodeListOf<HTMLElement> = document.querySelectorAll('[lang="pt"]');
const englishText: NodeListOf<HTMLElement> = document.querySelectorAll('[lang="en"]');

function setPortuguese(): void {
    const toggleClass = `window-button--active-${currentMode}`;
    engButton.classList.remove(toggleClass);
    porButton.classList.add(toggleClass);

    englishText.forEach(elem => elem.classList.add('hidden'));
    portugueseText.forEach(elem => elem.classList.remove('hidden'));
    geInput.placeholder = "Digite o nome de um item";

    localStorage.setItem('wikiTranslatorLanguageKey', 'pt');
}

function setEnglish(): void {
    const toggleClass = `window-button--active-${currentMode}`;
    porButton.classList.remove(toggleClass);
    engButton.classList.add(toggleClass);

    portugueseText.forEach(elem => elem.classList.add('hidden'));
    englishText.forEach(elem => elem.classList.remove('hidden'));
    geInput.placeholder = "Insert an item name (in Portuguese)";

    localStorage.setItem('wikiTranslatorLanguageKey', 'en');
}

porButton.addEventListener('click', setPortuguese);

engButton.addEventListener('click', setEnglish);

function setDefaultLanguage() {
    const lang = localStorage.getItem('wikiTranslatorLanguageKey');

    if (!lang) {
        const userLocale =
            navigator.languages && navigator.languages.length
                ? navigator.languages[0]
                : navigator.language;
    
        if (userLocale.includes('en')) {
            localStorage.setItem('wikiTranslatorLanguageKey', 'en');
            return setEnglish();
        }
        
        // Portuguese default language.
        localStorage.setItem('wikiTranslatorLanguageKey', 'pt');
        return setPortuguese();
    } 

    lang === 'pt' ? setPortuguese() : setEnglish();
}

setDefaultLanguage();