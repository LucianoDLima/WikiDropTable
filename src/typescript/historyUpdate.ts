import { currentMode } from "./colorMode";

const websiteButtons = Array.from(document.querySelectorAll('[data-filter="website"]')) as HTMLButtonElement[];
const dayButtons = Array.from(document.querySelectorAll('[data-filter="days"]')) as HTMLButtonElement[];
const monthButtons = Array.from(document.querySelectorAll('[data-filter="months"]')) as HTMLButtonElement[];
const yearButtons = Array.from(document.querySelectorAll('[data-filter="years"]')) as HTMLButtonElement[];

const huSearchContainer = Array.from(document.querySelectorAll('[data-filter="container"]')) as HTMLDivElement[];
const huSearchButton: HTMLButtonElement = document.querySelector('[data-filter="search"]')!;

const dayArray = Array.from(dayButtons);
const monthArray = Array.from(monthButtons);
const yearArray = Array.from(yearButtons);

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
    monthList: [
        'Janeiro', 'Fevereiro', 'Março', 
        'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 
        'Outubro', 'Novembro', 'Dezembro'
    ],
    yearList: Array.from(
        { length: new Date().getFullYear() - 2009 + 1 }, 
        (_, index) => 2009 + index
    )
};

function showUpdatesInterface(): void {
    // Checks which date interface should appear
    const website = searchOptions.websiteDate.website;
    const daysContainer = huSearchContainer[1];
    const monthsContainer = huSearchContainer[2];
    const yearsContainer = huSearchContainer[3];

    const showDays = website !== 'Oficial';
    const showYears = ["Oficial", "Ambos"].includes(website);

    monthsContainer.classList.remove('hidden');
    daysContainer.classList.toggle('hidden', !showDays);
    yearsContainer.classList.toggle('hidden', !showYears);
    huSearchButton.classList.remove('window-button--disabled');
}

function handleSearchButtons(selected: HTMLButtonElement[]): void {
    selected.forEach((button: HTMLButtonElement): void => {
        button.addEventListener('click', (e: any): void => {
            selected.forEach((btn: HTMLButtonElement): void => {
                btn.classList.remove(`window-button--active-${currentMode}`);
            });
            
            button.classList.add(`window-button--active-${currentMode}`);

            const buttonsFilter = e.target.getAttribute('data-filter');
            const { websiteDate } = searchOptions;

            // Gets the index (textContent for website only) of the clicked item
            switch (buttonsFilter) {
                case 'website':
                    websiteDate.website = e.target.textContent.trim();
                    showUpdatesInterface();
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

handleSearchButtons(websiteButtons);
handleSearchButtons(dayButtons);
handleSearchButtons(monthButtons);
handleSearchButtons(yearButtons);

function openWebsite(url: string): void {
    // Opens it in a new tab
    window.open(url, '_blank');
}

huSearchButton.addEventListener('click', () => {
    const { yearList, websiteDate, monthList } = searchOptions;

    const year = yearList[websiteDate.year!];
    const month1 = websiteDate.month !== undefined ? websiteDate.month + 1 : '';
    const officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${year}&month=${month1}&filter=Filtrar`;
    
    const day = websiteDate.day !== undefined ? websiteDate.day + 1 : '';
    const month2 = monthList[websiteDate.month!]?.toLowerCase();
    const wikiWebsite = `https://pt.runescape.wiki/w/${day}_de_${month2}`;

    switch (searchOptions.websiteDate.website) {
        case 'Wiki':
            openWebsite(wikiWebsite);
            break;

        case 'Oficial':
            openWebsite(officialWebsite);
            break;

        case 'Ambos':
            openWebsite(officialWebsite);
            openWebsite(wikiWebsite);
            break;
    }
});