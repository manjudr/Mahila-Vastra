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
    const mobileMenu = document.querySelector('.mobile-menu');

    if (!menuBtn || !mobileMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('open');
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close menu when clicking outside
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
            mobileMenu.classList.remove('open');
            menuBtn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
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
            pattern.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        // Animate floating elements
        floatingElements.forEach((el, index) => {
            const intensity = (index + 1) * 15;
            const x = targetX * intensity;
            const y = targetY * intensity;
            el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });

        requestAnimationFrame(animate);
    }

    // Run parallax if the user has a precision pointer (mouse/stylus) or on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
        animate();
    }
}

/* ========================================
   DYNAMIC PATTERN GENERATION & INTERACTIONS
   ======================================== */

function initializeDynamicPatterns() {
    // Add subtle shimmer effect to gold elements on scroll
    // Changed to target hero-content instead of the whole hero section
    // so the navbar (which is in .hero) doesn't fade out
    const heroContent = document.querySelector('.hero-content');
    const goldElements = document.querySelectorAll('.logo-icon, .badge-icon, .title-line-3 em');

    // Search button interaction
    const searchBtn = document.querySelector('.btn-icon[aria-label="Search"]');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            console.log('Search functionality coming soon!');
        });
    }

    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                // Increased threshold to 1200 and ensured some visibility remains
                const opacity = Math.max(0.1, 1 - scrollY / 1200);

                if (heroContent) {
                    heroContent.style.opacity = opacity;
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
