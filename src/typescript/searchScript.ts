import { geItems } from './items';

const popupWindows = Array.from(document.querySelectorAll('[data-window="popup"]')) as HTMLDivElement[];
const popupButtons = Array.from(document.querySelectorAll('[data-button="menu"]')) as HTMLButtonElement[];
const grandExchangeButton = popupButtons[1];

const websiteButtons = Array.from(document.querySelectorAll('[data-filter="website"]')) as HTMLButtonElement[];
const dayButtons = Array.from(document.querySelectorAll('[data-filter="days"]')) as HTMLButtonElement[];
const monthButtons = Array.from(document.querySelectorAll('[data-filter="months"]')) as HTMLButtonElement[];
const yearButtons = Array.from(document.querySelectorAll('[data-filter="years"]')) as HTMLButtonElement[];

const historyUpdateSearchContainer = Array.from(document.querySelectorAll('[data-filter="container"]')) as HTMLDivElement[];
const grandExchangeSearchInput: HTMLInputElement = document.querySelector('[data-search="input"]')!;
const grandExchangeUrlButton: HTMLButtonElement = document.querySelector('[data-search="button"]')!;
const historyUpdateSearchButton: HTMLButtonElement = document.querySelector('[data-filter="search"]')!;

const searchBarFound = document.getElementById('ge_item_found')!;
const searchBarNotFound = document.getElementById('ge_not_found')!;

// Used for the swipe-to-close motion on the menu windows.
let startX: any;
let startY: any;

interface WebsiteDate {
    website: '' | 'Wiki' | 'Oficial' | 'Ambos';
    day: number | undefined;
    month: number | undefined;
    year: number | undefined;
}

interface SearchOptions {
    websiteDate: WebsiteDate;
    monthList: string[];
    yearList: number[];
}

const searchOptions: SearchOptions = {
    websiteDate: {
        website: '',
        day: undefined,
        month: undefined,
        year: undefined,
    },
    monthList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    // From year 2009 to 2023
    yearList: Array.from({ length: 15 }, (_, index) => 2009 + index),
};

function showHeaderInterface(): void {
    // Checks which date interface should appear
    const website = searchOptions.websiteDate.website;
    const daysContainer = historyUpdateSearchContainer[1];
    const yearsContainer = historyUpdateSearchContainer[3];

    const showDays = website === 'Wiki' || website !== 'Oficial';
    const showYears = !showDays;

    daysContainer.classList.toggle('hidden', !showDays);
    yearsContainer.classList.toggle('hidden', !showYears);
}

function handleSearchButtons(selected: HTMLButtonElement[]): void {
    // Handles the information got from the buttons
    const dayArray = Array.from(dayButtons);
    const monthArray = Array.from(monthButtons);
    const yearArray = Array.from(yearButtons);

    selected.forEach((button: any): void => {
        button.addEventListener('click', (e: any): void => {
            selected.forEach((buttons: any): void => {
                buttons.classList.remove('window-button--active');
            });

            button.classList.add('window-button--active');

            const buttonsFilter = e.target.getAttribute('data-filter');
            const { websiteDate } = searchOptions;

            // Gets the index (textContent for website only) of the clicked item
            switch (buttonsFilter) {
                case 'website':
                    websiteDate.website = e.target.textContent.trim();
                    showHeaderInterface();
                    break;

                case 'days':
                    websiteDate.day = dayArray.indexOf(e.target);
                    break;
                case 'months':
                    websiteDate.month = monthArray.indexOf(e.target);
                    break;
                case 'years':
                    websiteDate.year = yearArray.indexOf(e.target);
                    break;
            }
        });
    });
}

function openWebsite(url: string): void {
    // Opens it in a new tab
    window.open(url, '_blank');
}

export function activateButtons(): void {
    // All buttons in the HA section only
    handleSearchButtons(websiteButtons);
    handleSearchButtons(dayButtons);
    handleSearchButtons(monthButtons);
    handleSearchButtons(yearButtons);
}

export function handleHUWebsite(): void {
    historyUpdateSearchButton.addEventListener('click', () => {
        const { yearList, websiteDate, monthList } = searchOptions;
        const officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${yearList[websiteDate.year!]}&month=${websiteDate.month !== undefined ? websiteDate.month + 1 : ''}&filter=Filtrar`;
        const wikiWebsite = `https://pt.runescape.wiki/w/${websiteDate.day !== undefined ? websiteDate.day + 1 : ''}_de_${monthList[websiteDate.month!]?.toLowerCase()}`;

        switch (searchOptions.websiteDate.website) {
            case 'Wiki':
                openWebsite(wikiWebsite);
                break;

            case 'Oficial':
                openWebsite(officialWebsite);
                break;

            case 'Ambos':
                setTimeout(() => {
                    openWebsite(officialWebsite);
                }, 100);

                setTimeout(() => {
                    openWebsite(wikiWebsite);
                }, 200);
                break;
            default:
                // TODO: Remove it from console and just add a simple tooltip instead
                console.error('You must select the preferred website');
                break;
        }
    });
}

export function handleTouchEvents() {
    popupWindows.forEach((window) => {
        window.addEventListener('touchstart', (event: TouchEvent) => {
            const touch = event.touches[0];
            startX = touch.clientX;
            startY = touch.clientY;
        });

        window.addEventListener('touchend', (event: TouchEvent) => {
            const touch = event.changedTouches[0];
            const endX = touch.clientX;
            const endY = touch.clientY;

            // Calculate the horizontal distance and vertical distance of the swipe.
            const deltaX = endX - startX;
            const deltaY = endY - startY;

            const minSwipeDistance = 100;

            // This handles the closing of the popup windows on mobile
            // by allowing a swipe-to-close motion.
            if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
                const activeButton = document.querySelector('.header-button--active');
                activeButton?.classList.remove('header-button--active');
                window.classList.remove('menu-line__popup-window--show');
            }
        });
    });
}

export function showInterfaceFromHeaderButtons() {
    popupButtons.forEach((button, btnIndex) => {
        button.addEventListener('click', () => {
            const isActive = button.classList.contains('header-button--active');

            popupButtons.forEach((btn) => btn.classList.remove('header-button--active'));

            if (!isActive) button.classList.toggle('header-button--active');

            popupWindows.forEach((window: any, wndIndex: any) => {
                if (btnIndex === wndIndex) {
                    window.classList.toggle('menu-line__popup-window--show');
                    grandExchangeSearchInput.focus();
                } else {
                    window.classList.remove('menu-line__popup-window--show');
                }
            });
        });
    });
}

export function closeWindowOnClickOutside() {
    document.addEventListener('click', (event) => {
        const activeButton = document.querySelector('.header-button--active');
        const activeContainer = document.querySelector('.menu-line__popup-window--show');

        if (activeButton == null || activeContainer == null) return;

        const bothNotClicked = !activeButton.contains(event.target as Node) && !activeContainer.contains(event.target as Node);

        if (bothNotClicked) {
            activeButton.classList.remove('header-button--active');
            activeContainer.classList.remove('menu-line__popup-window--show');
        }
    });
}

function resetSearchBar() {
    grandExchangeUrlButton.classList.add('window-button--disabled');
    searchBarFound.classList.add('hidden');
    searchBarNotFound.classList.add('hidden');
}

export function clearGEInputSearch() {
    grandExchangeButton.addEventListener('click', () => {
        grandExchangeSearchInput.value = '';
        resetSearchBar();
    });
}

export function handleGEInputSearch() {
    grandExchangeSearchInput.addEventListener('input', () => {
        const input = grandExchangeSearchInput.value;

        if (!input) {
            resetSearchBar();
            return;
        }

        if (geItems.has(input)) {
            grandExchangeUrlButton.classList.remove('window-button--disabled');
            searchBarFound.classList.remove('hidden');
            searchBarNotFound.classList.add('hidden');
        } else {
            grandExchangeUrlButton.classList.add('window-button--disabled');
            searchBarNotFound.classList.remove('hidden');
            searchBarFound.classList.add('hidden');
        }
    });
}

export function displaySearchResultsPage() {
    grandExchangeUrlButton.addEventListener('click', () => {
        const item = grandExchangeSearchInput.value;
        const id = geItems.get(item);
        openWebsite(`https://secure.runescape.com/m=itemdb_rs/l=3/a=9/${item}/viewitem?obj=${id}`);
    });
}
