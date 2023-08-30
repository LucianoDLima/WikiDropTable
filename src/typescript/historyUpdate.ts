import { currentMode } from "./colorMode";

const websiteButtons = Array.from(document.querySelectorAll('[data-filter="website"]')) as HTMLButtonElement[];
const dayButtons = Array.from(document.querySelectorAll('[data-filter="days"]')) as HTMLButtonElement[];
const monthButtons = Array.from(document.querySelectorAll('[data-filter="months"]')) as HTMLButtonElement[];
const yearButtons = Array.from(document.querySelectorAll('[data-filter="years"]')) as HTMLButtonElement[];

const huSearchContainer = Array.from(document.querySelectorAll('[data-filter="container"]')) as HTMLDivElement[];
const huSearchButton: HTMLButtonElement = document.querySelector('[data-filter="search"]')!;

interface WebsiteDate {
    website: number;
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
        website: -1,
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

function openWebsite(url: string): void {
    // Opens it in a new tab
    window.open(url, '_blank');
}

websiteButtons.forEach((button: HTMLButtonElement, index: number): void => {
    button.addEventListener('click', (): void => {
        const toggleClass = `window-button--active-${currentMode}`;
        websiteButtons.forEach(btn => btn.classList.remove(toggleClass));
        button.classList.add(toggleClass);

        searchOptions.websiteDate.website = index;
        
        // Checks which date interface should appear.
        const website = searchOptions.websiteDate.website;
        const daysContainer = huSearchContainer[1];
        const monthsContainer = huSearchContainer[2];
        const yearsContainer = huSearchContainer[3];

        const showDays = website !== 1; // Isn't "Official".
        const showYears = [1, 2].includes(website); // Isn't "Wiki".

        monthsContainer.classList.remove('hidden');
        daysContainer.classList.toggle('hidden', !showDays);
        yearsContainer.classList.toggle('hidden', !showYears);
        huSearchButton.classList.remove('window-button--disabled');
    });
});

dayButtons.forEach((button: HTMLButtonElement, index: number): void => {
    button.addEventListener('click', (): void => {
        const toggleClass = `window-button--active-${currentMode}`;
        dayButtons.forEach(btn => btn.classList.remove(toggleClass));
        button.classList.add(toggleClass);

        searchOptions.websiteDate.day = index;
    });
});

monthButtons.forEach((button: HTMLButtonElement, index: number): void => {
    button.addEventListener('click', (): void => {
        const toggleClass = `window-button--active-${currentMode}`;
        monthButtons.forEach(btn => btn.classList.remove(toggleClass));
        button.classList.add(toggleClass);

        searchOptions.websiteDate.month = index;
    });
});

yearButtons.forEach((button: HTMLButtonElement, index: number): void => {
    button.addEventListener('click', (): void => {
        const toggleClass = `window-button--active-${currentMode}`;
        yearButtons.forEach(btn => btn.classList.remove(toggleClass));
        button.classList.add(toggleClass);

        searchOptions.websiteDate.year = index;
    });
});

huSearchButton.addEventListener('click', () => {
    const { yearList, websiteDate, monthList } = searchOptions;

    const year = yearList[websiteDate.year!];
    const month1 = websiteDate.month !== undefined ? websiteDate.month + 1 : '';
    const officialWebsite = `https://secure.runescape.com/m=news/l=3/a=9/archive?year=${year}&month=${month1}&filter=Filtrar`;
    
    const day = websiteDate.day !== undefined ? websiteDate.day + 1 : '';
    const month2 = monthList[websiteDate.month!]?.toLowerCase();
    const wikiWebsite = `https://pt.runescape.wiki/w/${day}_de_${month2}`;

    switch (searchOptions.websiteDate.website) {
        case 0: // Wiki
            openWebsite(wikiWebsite);
            break;

        case 1: // Official
            openWebsite(officialWebsite);
            break;

        case 2: // Both
            openWebsite(officialWebsite);
            openWebsite(wikiWebsite);
            break;
    }
});