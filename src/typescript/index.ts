import { translate } from './translator';
import { currentMode } from './colorMode';
import { sleep } from './grandExchange';

const inputTranslator: HTMLTextAreaElement = document.querySelector('[data-js="text-input"]')!;
const outputTranslator: HTMLTextAreaElement = document.querySelector('[data-js="text-output"]')!;
const copyButton: HTMLButtonElement = document.querySelector('[data-js="copy-button"]')!;
const copyIcon: HTMLImageElement = document.querySelector('[data-js="copy-icon"]')!;
const copySuccess: HTMLImageElement = document.querySelector('[data-js="copy-success"]')!;
const delButton: HTMLButtonElement = document.querySelector('[data-js="delete-button"]')!;

const popupWindows = Array.from(document.querySelectorAll('[data-window="popup"]')) as HTMLDivElement[];
const popupButtons = Array.from(document.querySelectorAll('[data-button="menu"]')) as HTMLButtonElement[];

// Used for the swipe-to-close motion on the menu windows.
let startX: any;
let startY: any;

// Used to close the last opened side window.
let lastButtonIndex: number;

inputTranslator.focus();

inputTranslator.addEventListener('input', (): void => {
    const translated = translate(inputTranslator.value);
    outputTranslator.value = translated;

    if (translated) {
        // Moves it to the side if there's a scrollbar active.
        copyButton?.classList.toggle(
            'textbox__button--active-scroll', 
            outputTranslator.clientHeight < outputTranslator.scrollHeight
        );
        delButton?.classList.toggle(
            'textbox__button--active-scroll', 
            inputTranslator.clientHeight < inputTranslator.scrollHeight
        );

        copyButton?.classList.remove('hidden');
        delButton?.classList.remove('hidden');
    } else {
        copyButton?.classList.add('hidden');
        delButton?.classList.add('hidden');
    }
});

window.addEventListener('resize', (): void => {
    copyButton?.classList.toggle(
        'textbox__button--active-scroll', 
        outputTranslator.clientHeight < outputTranslator.scrollHeight
    );
    delButton?.classList.toggle(
        'textbox__button--active-scroll', 
        inputTranslator.clientHeight < inputTranslator.scrollHeight
    );
});

copyButton?.addEventListener('focusout', (): void => {
    copySuccess?.classList.add('hidden');
    copyIcon?.classList.remove('hidden');
});

copyButton?.addEventListener('click', (): void => {
    navigator.clipboard
        .writeText(outputTranslator.value)
        .then((): void => {
            copyIcon?.classList.add('hidden');
            copySuccess?.classList.remove('hidden');
        })
        .catch((error): void => {
            console.error('Failed to copy text: ', error);
        });

    setTimeout((): void => {
        copySuccess?.classList.add('hidden');
        copyIcon?.classList.remove('hidden');
    }, 2500);
});

delButton?.addEventListener('click', (): void => {
    inputTranslator.value = outputTranslator.value = '';
    copyButton?.classList.add('hidden');
    delButton?.classList.add('hidden');
});

popupWindows.forEach((window): void => {
    window.addEventListener('touchstart', (event: TouchEvent): void => {
        const touch = event.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
    });

    window.addEventListener('touchend', (event: TouchEvent): void => {
        const touch = event.changedTouches[0];
        const endX = touch.clientX;
        const endY = touch.clientY;

        // Calculate the horizontal distance and vertical distance of the swipe.
        const deltaX = endX - startX;
        const deltaY = endY - startY;

        const minSwipeDistance = 100;

        // Handles the closing of the popup windows by a swipe-to-close motion on mobile.
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
            const activeButton = document.querySelector(`header-button--active-${currentMode}`);
            activeButton?.classList.remove(`header-button--active-${currentMode}`);
            window.classList.remove('menu-line__popup-window--show');
        }
    });
});

popupButtons.forEach((button: HTMLButtonElement, btnIndex: number) => {
    button.addEventListener('click', async (): Promise<void> => {
        const toggleClass = `header-button--active-${currentMode}`;
        const popupWindow = popupWindows[btnIndex];
    
        if (!button.classList.contains(toggleClass)) {
            // Must happen first to feel responsive.
            button.classList.toggle(toggleClass);

            const lastActiveButton = popupButtons[lastButtonIndex];
            const lastActiveWindow = popupWindows[lastButtonIndex];

            if (lastActiveWindow) {
                lastActiveButton?.classList.remove(toggleClass);
                lastActiveWindow?.classList.remove('menu-line__popup-window--show');
                lastActiveWindow?.classList.add('menu-line__popup-window--hide');
                // Animation is 750ms, but 500ms feels just right.
                await sleep(500);
            }
            
            popupWindow.classList.remove('menu-line__popup-window--hide');
            popupWindow.classList.add('menu-line__popup-window--show');

            lastButtonIndex = btnIndex;
        } else {
            button.classList.remove(toggleClass);
            popupWindow.classList.remove('menu-line__popup-window--show');
            popupWindow.classList.add('menu-line__popup-window--hide');
        }
    });
});

document.addEventListener('click', (event): void => {
    const classMode = `header-button--active-${currentMode}`;

    const activeButton = document.querySelector(`.${classMode}`);
        
    const activeContainer = document.querySelector('.menu-line__popup-window--show');

    if (activeButton == null || activeContainer == null) 
        return;

    const bothNotClicked = 
        !activeButton.contains(event.target as Node) && 
        !activeContainer.contains(event.target as Node);

    if (bothNotClicked) {
        activeButton.classList.remove(classMode);
        activeContainer.classList.remove('menu-line__popup-window--show');
        activeContainer.classList.add('menu-line__popup-window--hide');
    }
});