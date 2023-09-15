import { options } from "./index";

const containers: NodeListOf<HTMLElement> = document.querySelectorAll('.tooltip');

function toolTipPosition(eventY: number, mouseY: number, tooltipHeight: number): number {
    // Places the tooltip atop the cursor if it blows the clientHeight.
    if (eventY + tooltipHeight + 25 > options.clientHeight)
        return mouseY - tooltipHeight;

    // Places it below below the cursor.
    return mouseY + 25;
}

containers.forEach((container) => {
    container.addEventListener('mousemove', (event: MouseEvent): void => {
        const tooltip: HTMLDivElement = container.querySelector('.tooltip__text')!;
        const tooltipHeight = tooltip.getBoundingClientRect().height;

        // Calculates the position inside the hovered element.
        const containerRect = container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        // Places the tooltip center under the cursor.
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipX = mouseX - tooltipWidth / 2;
        const tooltipY = toolTipPosition(event.clientY, mouseY, tooltipHeight);

        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
    });
});