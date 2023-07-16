import { geItems } from './items.js';

const headerButtons = document.querySelectorAll('[data-header="button"]');
const datesInterface = document.querySelector('[data-uh="container"]');
const searchInterface = document.querySelector('[data-search="container"]');
const websiteButtons = document.querySelectorAll('[data-filter="website"]');
const dayButtons = document.querySelectorAll('[data-filter="days"]');
const monthButtons = document.querySelectorAll('[data-filter="months"]');
const yearButtons = document.querySelectorAll('[data-filter="years"]');
const historyUpdateSearchButton = document.querySelector('[data-filter="search"]');
const historyUpdateSearchContainer = document.querySelectorAll('[data-filter="container"]');
const grandExchangeSearchInput = document.querySelector('[data-search="input"]');
const grandExchangeUrlButton = document.querySelector('[data-search="button"]');
const grandExchangeButton = headerButtons[1];

const searchBarFound = document.getElementById('ge_item_found');
const searchBarNotFound = document.getElementById('ge_not_found');

const searchOptions = {
    websiteDate: {
        website: undefined,
        day: undefined,
        month: undefined,
        year: undefined,
    },
    monthList: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
    // From year 2009 to 2023
    yearList: Array.from({ length: 15 }, (_, index) => 2009 + index),
};

function showHeaderInterface() {
    // Checks which date interface should appear
    const website = searchOptions.websiteDate.website;
    const daysContainer = historyUpdateSearchContainer[1];
    const yearsContainer = historyUpdateSearchContainer[3];

    const showDays = website === 'Wiki' || website !== 'Oficial';
    const showYears = website !== 'Wiki' || website === 'Oficial';

    daysContainer.classList.toggle('hidden', !showDays);
    yearsContainer.classList.toggle('hidden', !showYears);
}

function handleSearchButtons(selected) {
    // Handles the information got from the buttons
    const dayArray = Array.from(dayButtons);
    const monthArray = Array.from(monthButtons);
    const yearArray = Array.from(yearButtons);

    selected.forEach((button) => {
        button.addEventListener('click', (e) => {
            selected.forEach((buttons) => {
                buttons.classList.remove('active');
            });

            button.classList.add('active');

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

function activateButtons() {
    // All buttons in the HA section only
    handleSearchButtons(websiteButtons);
    handleSearchButtons(dayButtons);
    handleSearchButtons(monthButtons);
    handleSearchButtons(yearButtons);
}

function openWebsite(url) {
    // Opens it in a new tab
    window.open(url, '_blank');
}

activateButtons();
historyUpdateSearchButton.addEventListener('click', () => {
    // Handles where the new tab will take you
    const { yearList, websiteDate, monthList } = searchOptions;
    const officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${yearList[websiteDate.year]}&month=${websiteDate.month + 1}&filter=Filtrar`;
    const wikiWebsite = `https://pt.runescape.wiki/w/${websiteDate.day + 1}_de_${monthList[websiteDate.month]?.toLowerCase()}`;

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

headerButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const historyUpdate = e.target.closest('[data-history]');
        const grandExchange = e.target.closest('[data-exchange]');

        headerButtons.forEach((button) => {
            // Closes the interface that's not the button's target
            if (button !== btn) {
                button.classList.remove('active');
            }
        });

        // Opens the interface that's the button's target
        if (historyUpdate) {
            searchInterface.classList.add('hidden');
            datesInterface.classList.toggle('hidden');
        } else if (grandExchange) {
            datesInterface.classList.add('hidden');
            searchInterface.classList.toggle('hidden');
        }

        btn.classList.toggle('active');
    });
});

document.body.addEventListener('click', (e) => {
    // Closes the header interfaces if clicked outside
    const headerContainer = e.target.closest('.header__container');

    if (!headerContainer) {
        headerButtons.forEach((btns) => {
            btns.classList.remove('active');
        });
        datesInterface.classList.add('hidden');
        searchInterface.classList.add('hidden');
    }
});

function resetSearchBar() {
    grandExchangeUrlButton.classList.add('disabled');
    searchBarFound.classList.add('hidden');
    searchBarNotFound.classList.add('hidden');
}

grandExchangeButton.addEventListener('click', () => {
    grandExchangeSearchInput.value = '';
    resetSearchBar();
});

grandExchangeSearchInput.addEventListener('input', () => {
    const input = grandExchangeSearchInput.value;

    if (!input) {
        resetSearchBar();
        return;
    }
    
    if (geItems.has(input)) {
        grandExchangeUrlButton.classList.remove('disabled');
        searchBarFound.classList.remove('hidden');
        searchBarNotFound.classList.add('hidden');
    } else {
        grandExchangeUrlButton.classList.add('disabled');
        searchBarNotFound.classList.remove('hidden');
        searchBarFound.classList.add('hidden');
    }
});

grandExchangeUrlButton.addEventListener('click', () => {
    const item = grandExchangeSearchInput.value;
    const id = geItems.get(item);
    openWebsite(`https://secure.runescape.com/m=itemdb_rs/l=3/a=9/${item}/viewitem?obj=${id}`);
});