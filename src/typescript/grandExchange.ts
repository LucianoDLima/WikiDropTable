import { geItems } from './items';

const geButton = document.querySelectorAll('[data-button="menu"]')[1]! as HTMLButtonElement;
const geSearchInput: HTMLInputElement = document.querySelector('[data-search="input"]')!;
const geUrlButton: HTMLButtonElement = document.querySelector('[data-search="button"]')!;

const searchBarFound = document.getElementById('ge_item_found')!;
const searchBarNotFound = document.getElementById('ge_not_found')!;

function resetSearchBar() {
    geUrlButton.classList.add('window-button--disabled');
    searchBarFound.classList.add('hidden');
    searchBarNotFound.classList.add('hidden');
}

geButton.addEventListener('click', () => {
    geSearchInput.value = '';
    geSearchInput.focus();
    resetSearchBar();
});

geSearchInput.addEventListener('input', () => {
    const input = geSearchInput.value;

    if (!input) {
        resetSearchBar();
        return;
    }

    if (geItems.has(input)) {
        geUrlButton.classList.remove('window-button--disabled');
        searchBarFound.classList.remove('hidden');
        searchBarNotFound.classList.add('hidden');
    } else {
        geUrlButton.classList.add('window-button--disabled');
        searchBarNotFound.classList.remove('hidden');
        searchBarFound.classList.add('hidden');
    }
});

geUrlButton.addEventListener('click', () => {
    const item = geSearchInput.value;
    const id = geItems.get(item);
    window.open(
        `https://secure.runescape.com/m=itemdb_rs/l=3/a=9/${item}/viewitem?obj=${id}`, 
        '_blank'
    );
});