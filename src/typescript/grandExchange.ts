import { showIcons, showDetailed } from './geOptions';
import { currentMode } from './colorMode';
import { geItems } from './items';
import { sleep } from './sleep';

const geButton = document.querySelectorAll('[data-button="menu"]')[1]! as HTMLButtonElement;
const geSearchInput: HTMLInputElement = document.querySelector('[data-search="input"]')!;
const geItemsContainer: HTMLElement = document.getElementById('ge-items')!;

const searchBarFound = document.getElementById('ge_item_found')!;
const searchBarNotFound = document.getElementById('ge_not_found')!;

const geItemKeys = geItems.keys();
let iconsTimer: NodeJS.Timeout | null = null;
let itemsFound: string[] = [];
let itemInput: string;

async function addItemsFound() {
    searchBarFound.classList.remove('hidden');

    const items = itemsFound;

    for (const item of items) {
        // The input changed while this was running.
        if (items !== itemsFound)
            return;

        const itemID = geItems.get(item)!;

        const container = document.createElement('div');
        container.className = `ge-item ge-item--${currentMode}`;
    
        const paragraph = document.createElement('p');
        paragraph.className = 'ge-item__name';
        paragraph.textContent = item;
    
        const button = document.createElement('button');
        button.className = `window-button window-button--${currentMode}`;
        button.textContent = 'Abrir';
        button.addEventListener('click', () => {
            window.open(
                `https://secure.runescape.com/m=itemdb_rs/l=3/a=9/${item}/viewitem?obj=${itemID}`, 
                '_blank'
            );
        });
    
        if (showIcons) {
            const image = document.createElement('img');
            const variant = showDetailed ? 'big' : 'sprite';
            const imgClass = showDetailed ? 'ge-item__img' : '';
            
            image.src = `https://secure.runescape.com/m=itemdb_rs/obj_${variant}.gif?id=${itemID}`;
            image.className = imgClass;

            container.appendChild(image);

            // Prevents request spam to the API.
            await sleep(50);
        }

        container.appendChild(paragraph);
        container.appendChild(button);
    
        geItemsContainer.appendChild(container);
    }
}  

function resetSearchBar() {
    if (iconsTimer !== null) {
        clearTimeout(iconsTimer);
    }

    const componentsToRemove = geItemsContainer.querySelectorAll('.ge-item');
    componentsToRemove.forEach(component => {
        geItemsContainer.removeChild(component);
    });

    searchBarFound.classList.add('hidden');
    searchBarNotFound.classList.add('hidden');
}

geButton.addEventListener('click', () => {
    geSearchInput.value = '';
    geSearchInput.focus();
    resetSearchBar();
});

geSearchInput.addEventListener('input', () => {
    resetSearchBar();

    const lessWords = itemInput 
        ? itemInput.length > geSearchInput.value.length 
        : true;

    itemInput = geSearchInput.value;

    if (!itemInput || itemInput.length === 1) {
        searchBarNotFound.classList.remove('hidden');
        itemsFound = [];
        return; 
    }

    if (lessWords || itemsFound.length === 0) {
        itemsFound = geItemKeys.filter(
            key => key.toLowerCase().includes(itemInput.toLowerCase())
        );    
    } else {
        itemsFound = itemsFound.filter(
            str => str.toLowerCase().includes(itemInput.toLowerCase())
        );
    }

    if (itemsFound.length === 0) {
        searchBarNotFound.classList.remove('hidden');
        return;
    } 

    if (showIcons)
        iconsTimer = setTimeout(addItemsFound, 250);
    else
        addItemsFound();
});