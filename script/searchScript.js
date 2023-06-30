const haButton = document.querySelector('#uh-button');
const haInputs = document.querySelector('[data-uh]');
const websiteButtons = document.querySelectorAll('[data-filter="website"]');
const dayButtons = document.querySelectorAll('[data-filter="days"]');
const monthButtons = document.querySelectorAll('[data-filter="months"]');
const yearButtons = document.querySelectorAll('[data-filter="years"]');
const searchButton = document.querySelector('[data-filter="search"]');
const searchContainer = document.querySelectorAll('.droptable__date');

const searchOptions = {
    websiteDate: {
        website: undefined,
        day: undefined,
        month: undefined,
        year: undefined,
    },
    monthList: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'November',
        'Dezembro',
    ],
    // From year 2009 to 2023
    yearList: Array.from({ length: 15 }, (_, index) => 2009 + index),
};

function showHeaderInterface() {
    // Checks which date interface should appear
    const website = searchOptions.websiteDate.website;
    const daysContainer = searchContainer[1];
    const yearsContainer = searchContainer[3];

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
            const { websiteDate } = searchOptions

			// Gets the index (textContent for website only) of the clicked item
            switch (buttonsFilter) {
                case 'website':
                    websiteDate.website = e.target.textContent;
                    showHeaderInterface()
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

searchButton.addEventListener('click', () => {
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
            console.error('You must select the preferred website');
            break;
    }
});

activateButtons()

// Opens the search interface
haButton.addEventListener('click', () => {
    haButton.classList.toggle('active');
    haInputs.classList.toggle('active');
});

// Closes if clicked outside the ha container
document.body.addEventListener('click', (e) => {
    if (!e.target.closest('.active')) {
        haButton.classList.remove('active');
        haInputs.classList.remove('active');
    }
});