/* ========================================
   MAHILA VASTRA - Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeMobileMenu();
    initializeParallaxEffects();
    initializeDynamicPatterns();
});

/* ========================================
   ANIMATION INITIALIZATION
   ======================================== */

function initializeAnimations() {
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');

    // Staggered fade-in for floating patterns
    const patterns = document.querySelectorAll('.pattern');
    patterns.forEach((pattern, index) => {
        pattern.style.animationDelay = `${index * 0.5}s`;
    });
}

/* ========================================
   MOBILE MENU
   ======================================== */

function initializeMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (!menuBtn) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');

        // Create mobile menu if it doesn't exist
        let mobileMenu = document.querySelector('.mobile-menu');

        if (!mobileMenu) {
            mobileMenu = createMobileMenu();
            document.body.appendChild(mobileMenu);
        }

        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
}

function createMobileMenu() {
    const menu = document.createElement('div');
    menu.className = 'mobile-menu';
    menu.innerHTML = `
        <div class="mobile-menu-content">
            <nav class="mobile-nav">
                <a href="#collections" class="mobile-nav-link">Our <em>Collections</em></a>
                <a href="#story" class="mobile-nav-link">The <em>Story</em></a>
                <a href="#craftsmanship" class="mobile-nav-link"><em>Craftsmanship</em></a>
                <a href="#contact" class="mobile-nav-link"><em>Contact</em> Us</a>
            </nav>
            <div class="mobile-cta">
                <a href="#collections" class="btn-nav-cta">Shop Now</a>
            </div>
        </div>
    `;

    // Close menu when clicking links
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('open');
            document.querySelector('.mobile-menu-btn').classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    return menu;
}

/* ========================================
   PARALLAX EFFECTS
   ======================================== */

function initializeParallaxEffects() {
    const patterns = document.querySelectorAll('.pattern');
    const floatingElements = document.querySelectorAll('.floating-element');
    const showcaseCards = document.querySelectorAll('.showcase-card');

    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    function animate() {
        // Smooth interpolation
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        // Animate patterns with different intensities
        patterns.forEach((pattern, index) => {
            const intensity = (index + 1) * 8;
            const x = targetX * intensity;
            const y = targetY * intensity;
            pattern.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Animate floating elements
        floatingElements.forEach((el, index) => {
            const intensity = (index + 1) * 15;
            const x = targetX * intensity;
            const y = targetY * intensity;
            el.style.transform = `translate(${x}px, ${y}px)`;
        });

        requestAnimationFrame(animate);
    }

    // Only run parallax on non-touch devices
    if (!('ontouchstart' in window)) {
        animate();
    }
}

/* ========================================
   DYNAMIC PATTERN GENERATION
   ======================================== */

function initializeDynamicPatterns() {
    // Add subtle shimmer effect to gold elements on scroll
    const heroSection = document.querySelector('.hero');
    const goldElements = document.querySelectorAll('.logo-icon, .badge-icon, .title-line-3 em');

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const opacity = Math.max(0, 1 - scrollY / 500);

                if (heroSection) {
                    heroSection.style.opacity = opacity;
                }

                ticking = false;
            });
            ticking = true;
        }
    });
}

/* ========================================
   SMOOTH SCROLL FOR NAVIGATION
   ======================================== */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/* ========================================
   INTERSECTION OBSERVER FOR ANIMATIONS
   ======================================== */

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements that should animate on scroll
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

/* ========================================
   CRAFTSMANSHIP JOURNEY SCROLL ANIMATIONS
   ======================================== */

function initializeCraftsmanshipJourney() {
    const journeyPanels = document.querySelectorAll('.journey-panel');

    const panelObserverOptions = {
        threshold: 0.3, // Trigger when 30% of panel is visible
        rootMargin: '0px'
    };

    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class for animations
                entry.target.classList.add('is-visible');
            } else {
                // Optional: remove class when scrolling away to allow re-trigger
                // entry.target.classList.remove('is-visible');
            }
        });
    }, panelObserverOptions);

    // Observe all journey panels
    journeyPanels.forEach(panel => {
        panelObserver.observe(panel);
    });
}

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCraftsmanshipJourney);
} else {
    initializeCraftsmanshipJourney();
}
