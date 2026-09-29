/** Progressive enhancement for the HTML-authored project gallery. */
export function initProjects() {
    const filterGroup = document.querySelector('.projects-filter');
    const buttons = [...document.querySelectorAll('[data-filter]')];
    const cards = [...document.querySelectorAll('[data-project-card]')];
    const groups = [...document.querySelectorAll('[data-project-group]')];
    const results = document.querySelector('.projects-results');

    if (!filterGroup || buttons.length === 0 || cards.length === 0) return;

    const applyFilter = (filter) => {
        let visibleCount = 0;

        cards.forEach((card) => {
            const categories = (card.dataset.categories || '').split(/\s+/).filter(Boolean);
            const isVisible = filter === 'all' || categories.includes(filter);
            card.hidden = !isVisible;
            if (isVisible) visibleCount += 1;
        });

        groups.forEach((group) => {
            group.hidden = !group.querySelector('[data-project-card]:not([hidden])');
        });

        buttons.forEach((button) => {
            button.setAttribute('aria-pressed', String(button.dataset.filter === filter));
        });

        if (results) {
            const label = buttons.find((button) => button.dataset.filter === filter)?.textContent.trim();
            results.textContent = filter === 'all'
                ? `Showing all ${visibleCount} projects`
                : `Showing ${visibleCount} ${label} ${visibleCount === 1 ? 'project' : 'projects'}`;
        }

        document.dispatchEvent(new CustomEvent('portfolio:projects-filtered', {
            detail: { filter, visibleCount },
        }));
    };

    buttons.forEach((button) => {
        button.addEventListener('click', () => applyFilter(button.dataset.filter || 'all'));
    });

    // Reveal controls only after every button has a working handler.
    filterGroup.hidden = false;
    applyFilter('all');
}
