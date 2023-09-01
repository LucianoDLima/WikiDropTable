const allElementsWithClass = document.querySelectorAll<HTMLElement>("[class]");
const darkModeButton = document.getElementById('darkmode-button');
const lightModeButton = document.getElementById('lightmode-button');

const localStorageKey = 'wikiTranslatorVisualStyle';
export let currentMode: string;

function changeMode(mode: string): void {
    if (mode === currentMode)
        return;

    for (const elem of allElementsWithClass) {
        const classList = elem.classList;
        
        // This is for cases where there may be multiple color classes.
        // After changing one, it needs to restart since they'll change order.
        outerWhile: while (true) {
            for (const className of classList) {
                if (className.includes(currentMode)) {
                    const newClass = className.replace(currentMode, mode);
                    classList.remove(className);
                    classList.add(newClass);
                    continue outerWhile;
                } 
            }
            break;
        }
    }

    currentMode = mode;

    localStorage.setItem(
        localStorageKey, 
        mode
    );
}

darkModeButton?.addEventListener('click', () => {
    changeMode('dark');
    darkModeButton.classList.add('window-button--active-dark');
    lightModeButton?.classList.remove('window-button--active-dark');
});

lightModeButton?.addEventListener('click', () => {
    changeMode('light');
    lightModeButton.classList.add('window-button--active-light');
    darkModeButton?.classList.remove('window-button--active-light');
});

function setVisuals(): void {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        currentMode = 'dark';
    } else {
        currentMode = 'light';
    }

    const storedValue = localStorage.getItem(localStorageKey);

    storedValue !== null ? changeMode(storedValue) : changeMode(currentMode);

    if (currentMode === 'dark') {
        darkModeButton?.classList.add('window-button--active-dark');
        lightModeButton?.classList.remove('window-button--active-dark');
    } else {
        lightModeButton?.classList.add('window-button--active-light');
        darkModeButton?.classList.remove('window-button--active-light');
    }
}

setVisuals();