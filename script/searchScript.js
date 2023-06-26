const haButton = document.querySelector('#uh-button');
const haInputs = document.querySelector('[data-uh]');
const websiteButtons = document.querySelectorAll('[data-filter="website"]');
const dayButtons = document.querySelectorAll('[data-filter="days"]');
const monthButtons = document.querySelectorAll('[data-filter="months"]');
const yearButtons = document.querySelectorAll('[data-filter="years"]');
const searchButton = document.querySelector('[data-filter="search"]');
const searchContainer = document.querySelectorAll('.droptable__date');

let website = '';
let day = '';
let month = '';
let year = '';

const monthList = [
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
];
const yearList = [
    2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022, 2023,
];

// Handles the information got from the buttons
function handleSearchButtons(selected) {
    const dayArray = Array.from(dayButtons);
    const monthArray = Array.from(monthButtons);
    const yearArray = Array.from(yearButtons);

    selected.forEach((button) => {
        button.addEventListener('click', (e) => {
            selected.forEach((buttons) => {
                buttons.classList.remove('active');
            });

            button.classList.add('active');

			// Gets the index (textContent for website only) of the clicked item
            switch (e.target.getAttribute('data-filter')) {
                case 'website':
                    website = e.target.textContent;

					// Only show the interface needed for the current selected website
                    if (website === 'Wiki') {
                        searchContainer[1].classList.remove('hidden');
                        searchContainer[3].classList.add('hidden');
                    } else if (website === 'Oficial') {
                        searchContainer[1].classList.add('hidden');
                        searchContainer[3].classList.remove('hidden');
                    } else {
                        searchContainer[1].classList.remove('hidden');
                        searchContainer[3].classList.remove('hidden');
                    }
                    break;

                case 'days':
                    day = dayArray.indexOf(e.target);
                    break;
                case 'months':
                    month = monthArray.indexOf(e.target);
                    break;
                case 'years':
                    year = yearArray.indexOf(e.target);
                    break;
            }
        });
    });
}

handleSearchButtons(websiteButtons);
handleSearchButtons(dayButtons);
handleSearchButtons(monthButtons);
handleSearchButtons(yearButtons);

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

// Opens a new tab, taking you to the website selected
searchButton.addEventListener('click', () => {
    let officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${yearList[year]}&month=${month + 1}&filter=Filtrar`;
    let wikiWebsite = `https://pt.runescape.wiki/w/${day + 1}_de_${monthList[month]?.toLowerCase()}`;

    switch (website) {
        case 'Wiki':
            window.open(wikiWebsite, '_blank');
            break;

        case 'Oficial':
            window.open(officialWebsite, '_blank');
            break;

        case 'Ambos':
            setTimeout(() => {
                window.open(officialWebsite, '_blank');
            }, 100);

            setTimeout(() => {
                window.open(wikiWebsite, '_blank');
            }, 200);
            break;
        default:
            console.error('You must select the preferred website');
            break;
    }
});
