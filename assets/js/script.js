/* ========================================
   MAHILA VASTRA - Interactive Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    initializeAnimations();
    initializeMobileMenu();
    initializeParallaxEffects();
    initializeDynamicPatterns();
    initializeHeroZIndexRotation();
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
                const vh = window.innerHeight;
                const isMobile = window.innerWidth <= 768;

                // Responsive Hero Fade:
                // Content stays 100% visible for much longer on mobile
                const startFade = isMobile ? vh * 0.7 : vh * 0.4;
                const fadeDistance = vh * 1.5;

                if (heroContent) {
                    let opacity = 1;
                    let translateY = 0;

                    if (scrollY > startFade) {
                        // Very gradual fade (minimum 0.15 opacity)
                        opacity = Math.max(0.15, 1 - (scrollY - startFade) / fadeDistance);

                        // Disable parallax on mobile for reading stability
                        if (!isMobile) {
                            translateY = (scrollY - startFade) * 0.15;
                        }
                    }

                    heroContent.style.opacity = opacity;
                    heroContent.style.transform = `translate3d(0, ${translateY}px, 0)`;
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

// Add to initialization
document.addEventListener('DOMContentLoaded', () => {
    // ... existing init calls ...
});

/* ========================================
   HERO Z-INDEX ROTATION (MOBILE)
   ======================================== */

function initializeHeroZIndexRotation() {
    const cards = [
        document.querySelector('.showcase-card-1'),
        document.querySelector('.showcase-card-2'),
        document.querySelector('.showcase-card-3')
    ];

    if (cards.some(c => !c)) return;

    let step = 0;

    function cycle() {
        if (window.innerWidth > 768) return;

        // Cycle through 3 states using data attributes for smooth transitions
        if (step === 0) {
            cards[0].setAttribute('data-priority', 'top');
            cards[1].setAttribute('data-priority', 'middle');
            cards[2].setAttribute('data-priority', 'bottom');
        } else if (step === 1) {
            cards[0].setAttribute('data-priority', 'bottom');
            cards[1].setAttribute('data-priority', 'top');
            cards[2].setAttribute('data-priority', 'middle');
        } else {
            cards[0].setAttribute('data-priority', 'middle');
            cards[1].setAttribute('data-priority', 'bottom');
            cards[2].setAttribute('data-priority', 'top');
        }

        step = (step + 1) % 3;
    }

    // Change every 3 seconds
    setInterval(cycle, 3000);

    // Initial call
    cycle();
}
