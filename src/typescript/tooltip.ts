const containers: NodeListOf<HTMLElement> = document.querySelectorAll('.tooltip');

containers.forEach((container) => {
    const tooltip: HTMLSpanElement = container.querySelector('.tooltip__text')!;

    container.addEventListener('mousemove', (event: MouseEvent): void => {
        // Calculates the position inside the hovered element.
        const containerRect = container.getBoundingClientRect();
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;
        
        // Places the tooltip center under the cursor.
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipX = mouseX - tooltipWidth / 2;
        const tooltipY = mouseY + 20;
        
        tooltip.style.left = tooltipX + 'px';
        tooltip.style.top = tooltipY + 'px';
    });
});