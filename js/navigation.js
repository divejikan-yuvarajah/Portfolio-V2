const MOBILE_NAV_QUERY = '(max-width: 980px)';

function getHashTarget(link) {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#') || href.length < 2) return null;

    try {
        return document.getElementById(decodeURIComponent(href.slice(1)));
    } catch {
        return null;
    }
}

export function initNavigation() {
    const navigation = document.querySelector('.navbar');
    const menuButton = navigation?.querySelector('.menu-toggle');
    const menu = navigation?.querySelector('.nav-links');
    if (!navigation || !menuButton || !menu) return;

    const links = [...menu.querySelectorAll('a[href^="#"]')];
    const targets = links.map((link) => ({ link, target: getHashTarget(link) }))
        .filter(({ target }) => target);
    const targetLinks = new Map(targets.map(({ link, target }) => [target.id, link]));
    const mobileQuery = window.matchMedia(MOBILE_NAV_QUERY);

    navigation.dataset.enhanced = 'true';

    function setActiveLink(id) {
        links.forEach((link) => {
            if (link === targetLinks.get(id)) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }

    function setMenuOpen(open, restoreFocus = false) {
        const isOpen = Boolean(open && mobileQuery.matches);
        menu.classList.toggle('is-open', isOpen);
        menuButton.setAttribute('aria-expanded', String(isOpen));
        menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
        menu.setAttribute('aria-hidden', String(!isOpen && mobileQuery.matches));
        menu.inert = !isOpen && mobileQuery.matches;

        if (restoreFocus) menuButton.focus();
    }

    setMenuOpen(false);

    function updateActiveFromPosition() {
        const headerHeight = navigation.getBoundingClientRect().height;
        const activationLine = headerHeight + Math.max(80, window.innerHeight * 0.32);
        const current = targets
            .filter(({ target }) => {
                const rect = target.getBoundingClientRect();
                return rect.top <= activationLine && rect.bottom > headerHeight;
            })
            .at(-1);

        // The hero is intentionally the unselected state at the top of the page.
        setActiveLink(current?.target.id ?? '');
    }

    menuButton.addEventListener('click', () => {
        setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
    });

    menu.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (link) {
            const target = getHashTarget(link);
            if (target) setActiveLink(target.id);
            setMenuOpen(false, mobileQuery.matches && menu.contains(document.activeElement));
        }
    });

    document.addEventListener('pointerdown', (event) => {
        if (mobileQuery.matches && menuButton.getAttribute('aria-expanded') === 'true'
            && !navigation.contains(event.target)) {
            setMenuOpen(false, menu.contains(document.activeElement));
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || menuButton.getAttribute('aria-expanded') !== 'true') return;
        const focusWasInMenu = menu.contains(document.activeElement);
        setMenuOpen(false, focusWasInMenu);
    });

    function handleBreakpointChange(event) {
        setMenuOpen(false, event.matches && menu.contains(document.activeElement));
        menu.setAttribute('aria-hidden', String(event.matches));
        menu.inert = event.matches;
        updateActiveFromPosition();
    }

    if (mobileQuery.addEventListener) mobileQuery.addEventListener('change', handleBreakpointChange);
    else mobileQuery.addListener(handleBreakpointChange);

    window.addEventListener('hashchange', () => {
        let targetId = '';
        try {
            targetId = decodeURIComponent(window.location.hash.slice(1));
        } catch {
            return;
        }
        if (targetLinks.has(targetId)) setActiveLink(targetId);
        else updateActiveFromPosition();
    });

    let initialHash = '';
    try {
        initialHash = decodeURIComponent(window.location.hash.slice(1));
    } catch {
        // An invalid direct hash leaves the scroll-position state in control.
    }
    if (targetLinks.has(initialHash)) setActiveLink(initialHash);
    else updateActiveFromPosition();

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(() => updateActiveFromPosition(), {
            root: null,
            rootMargin: `-${Math.ceil(navigation.getBoundingClientRect().height)}px 0px -60% 0px`,
            threshold: 0
        });
        targets.forEach(({ target }) => observer.observe(target));
    } else {
        let frame = null;
        window.addEventListener('scroll', () => {
            if (frame !== null) return;
            frame = window.requestAnimationFrame(() => {
                frame = null;
                updateActiveFromPosition();
            });
        }, { passive: true });
        window.addEventListener('resize', updateActiveFromPosition, { passive: true });
    }
}
