
/* =========================================================
   LEGACY ESTIMATING - COMPLETE MAIN JAVASCRIPT
   DESKTOP + MOBILE RESPONSIVE
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. STICKY NAVBAR SHRINK
    ===================================================== */

    const header = document.getElementById("mainHeader");

    function updateHeader() {
        if (header) {
            header.classList.toggle("scrolled", window.scrollY > 50);
        }
    }

    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();


    /* =====================================================
       2. MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {
            const isOpen = navLinks.classList.toggle("show");
            const icon = menuBtn.querySelector("i");

            menuBtn.setAttribute("aria-expanded", String(isOpen));

            if (icon) {
                icon.classList.toggle("fa-xmark", isOpen);
                icon.classList.toggle("fa-bars", !isOpen);
            }
        });

        navLinks.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navLinks.classList.remove("show");
                menuBtn.setAttribute("aria-expanded", "false");

                const icon = menuBtn.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }



/* =====================================================
   3. HERO SLIDER
   Desktop + Tablet + Mobile
   Auto slide + Keyboard + Swipe
===================================================== */

(function () {
    const hero = document.querySelector(".hero");

    if (!hero) return;

    const slides = hero.querySelectorAll(".slide");

    if (slides.length === 0) return;

    let currentSlide = 0;
    let heroTimer = null;

    const slideDelay = 5000;

    // Set initial active slide
    const initialIndex = Array.from(slides).findIndex(function (slide) {
        return slide.classList.contains("active");
    });

    currentSlide = initialIndex >= 0 ? initialIndex : 0;

    function showSlide(index) {
        currentSlide = (index + slides.length) % slides.length;

        slides.forEach(function (slide, i) {
            slide.classList.toggle("active", i === currentSlide);
        });
    }

    function restartHeroTimer() {
        clearInterval(heroTimer);

        if (slides.length > 1) {
            heroTimer = setInterval(function () {
                showSlide(currentSlide + 1);
            }, slideDelay);
        }
    }

    // Show first slide and start autoplay
    showSlide(currentSlide);
    restartHeroTimer();

    // KEYBOARD LEFT / RIGHT ARROWS
    document.addEventListener("keydown", function (event) {
        const tag = event.target.tagName;

        if (
            tag === "INPUT" ||
            tag === "TEXTAREA" ||
            tag === "SELECT" ||
            event.target.isContentEditable ||
            event.altKey ||
            event.ctrlKey ||
            event.metaKey
        ) {
            return;
        }

        if (event.key === "ArrowRight") {
            event.preventDefault();
            showSlide(currentSlide + 1);
            restartHeroTimer();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            showSlide(currentSlide - 1);
            restartHeroTimer();
        }
    });

    // MOBILE SWIPE
    let touchStartX = 0;
    let touchStartY = 0;

    hero.addEventListener("touchstart", function (event) {
        touchStartX = event.changedTouches[0].clientX;
        touchStartY = event.changedTouches[0].clientY;
    }, { passive: true });

    hero.addEventListener("touchend", function (event) {
        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ignore vertical scrolling
        if (
            Math.abs(diffX) < 50 ||
            Math.abs(diffX) < Math.abs(diffY)
        ) {
            return;
        }

        if (diffX < 0) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(currentSlide - 1);
        }

        restartHeroTimer();
    }, { passive: true });

})();


/* =====================================================
   4. COUNTERS
   Uses your existing counter HTML
   Desktop + Tablet + Mobile
===================================================== */

(function () {
    const counterSection = document.querySelector(".counter-section");
    const counters = document.querySelectorAll(".counter");

    if (!counterSection || counters.length === 0) return;

    let counterStarted = false;

    function startCounters() {
        if (counterStarted) return;

        counterStarted = true;

        counters.forEach(function (counter) {
            const target = Number(counter.dataset.target);

            if (!Number.isFinite(target) || target < 0) return;

            const duration = 1800;
            const startTime = performance.now();

            function animateCounter(now) {
                const progress = Math.min(
                    (now - startTime) / duration,
                    1
                );

                const value = Math.floor(target * progress);

                counter.textContent = value.toLocaleString() + "+";

                if (progress < 1) {
                    requestAnimationFrame(animateCounter);
                } else {
                    counter.textContent =
                        target.toLocaleString() + "+";
                }
            }

            requestAnimationFrame(animateCounter);
        });
    }

    // Start when counter section is near the viewport
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries) {
                if (entries.some(function (entry) {
                    return entry.isIntersecting;
                })) {
                    startCounters();
                    observer.disconnect();
                }
            },
            {
                root: null,
                rootMargin: "0px 0px 250px 0px",
                threshold: 0
            }
        );

        observer.observe(counterSection);
    } else {
        startCounters();
    }
})();

    /* =====================================================
       5. TRADES SEARCH
    ===================================================== */

    const searchForm = document.getElementById("tradeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchMessage = document.getElementById("searchMessage");

    if (searchForm && searchInput) {

        const tradePages = {
            "legacy": "index.html",
            "legacy estimating": "index.html",
            "home": "index.html",

            "electrical": "trades/electrical-estimating.html",
            "electrical estimating": "trades/electrical-estimating.html",
            "electrical takeoff": "trades/electrical-takeoff.html",

            "mechanical": "trades/mechanical-estimating.html",
            "mechanical estimating": "trades/mechanical-estimating.html",
            "mechanical takeoff": "trades/mechanical-takeoff.html",

            "plumbing": "trades/plumbing-estimating.html",
            "plumbing estimating": "trades/plumbing-estimating.html",
            "plumbing takeoff": "trades/plumbing-takeoff.html",

            "drywall": "trades/drywall-estimating.html",
            "drywall estimating": "trades/drywall-estimating.html",
            "drywall takeoff": "trades/drywall-takeoff.html",

            "masonry": "trades/masonry-estimating.html",
            "masonry estimating": "trades/masonry-estimating.html",
            "masonry takeoff": "trades/masonry-takeoff.html",

            "lumber": "trades/lumber-estimating.html",
            "lumber estimating": "trades/lumber-estimating.html",
            "lumber takeoff": "trades/lumber-takeoff.html",

            "metals": "trades/metals-estimating.html",
            "metals estimating": "trades/metals-estimating.html",
            "metals takeoff": "trades/metals-takeoff.html",

            "concrete": "trades/concrete-estimating.html",
            "concrete estimating": "trades/concrete-estimating.html",
            "concrete takeoff": "trades/concrete-takeoff.html",

            "roofing": "trades/roofing-estimating.html",
            "roofing estimating": "trades/roofing-estimating.html",
            "roofing takeoff": "trades/roofing-takeoff.html",

            "site": "trades/site-work-estimating.html",
            "site work": "trades/site-work-estimating.html",
            "site work estimating": "trades/site-work-estimating.html",
            "site work takeoff": "trades/site-work-takeoff.html",

            "insulation": "trades/insulation-estimating.html",
            "insulation estimating": "trades/insulation-estimating.html",
            "insulation takeoff": "trades/insulation-takeoff.html",

            "interior": "trades/interior-estimating.html",
            "interior estimating": "trades/interior-estimating.html",
            "interior takeoff": "trades/interior-takeoff.html",

            "flooring": "trades/flooring-estimating.html",
            "flooring estimating": "trades/flooring-estimating.html",
            "flooring takeoff": "trades/flooring-takeoff.html"
        };

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const query = searchInput.value
                .trim()
                .toLowerCase()
                .replace(/\s+/g, " ");

            if (searchMessage) {
                searchMessage.textContent = "";
            }

            if (!query) {
                if (searchMessage) {
                    searchMessage.textContent = "Please enter a search term.";
                }
                return;
            }

            if (tradePages[query]) {
                window.location.href = tradePages[query];
                return;
            }

            const match = Object.keys(tradePages).find(function (page) {
                return page.includes(query) || query.includes(page);
            });

            if (match) {
                window.location.href = tradePages[match];
            } else if (searchMessage) {
                searchMessage.textContent = "No matching page found.";
            }
        });
    }


    /* =====================================================
       6. HERO SLIDER - TOUCH SWIPE ON MOBILE
    ===================================================== */

    const heroSlider = document.querySelector(".hero");

    let touchStartX = 0;
    let touchStartY = 0;

    if (heroSlider) {
        heroSlider.addEventListener("touchstart", function (event) {
            if (!event.touches.length) return;

            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        }, { passive: true });

        heroSlider.addEventListener("touchend", function (event) {
            if (!event.changedTouches.length) return;

            const differenceX = event.changedTouches[0].clientX - touchStartX;
            const differenceY = event.changedTouches[0].clientY - touchStartY;

            if (Math.abs(differenceX) < 50) return;
            if (Math.abs(differenceX) < Math.abs(differenceY)) return;

            showSlide(differenceX < 0 ? currentSlide + 1 : currentSlide - 1);
            restartHeroTimer();
        }, { passive: true });
    }


    /* =====================================================
       7. BASIC CONTENT PROTECTION
       Note: These are deterrents, not complete security.
    ===================================================== */

    document.addEventListener("contextmenu", function (event) {
        event.preventDefault();
    });

    document.addEventListener("dragstart", function (event) {
        if (event.target.closest("img")) {
            event.preventDefault();
        }
    });

    document.querySelectorAll("img").forEach(function (img) {
        img.setAttribute("draggable", "false");
    });

    document.querySelectorAll(".protected-content").forEach(function (element) {
        element.style.userSelect = "none";
        element.style.webkitUserSelect = "none";
    });

    document.addEventListener("keydown", function (event) {
        const key = event.key.toLowerCase();

        if (
            (event.ctrlKey || event.metaKey) &&
            ["u", "s", "c"].includes(key)
        ) {
            event.preventDefault();
        }
    }, true);


    /* =====================================================
       8. GOOGLE REVIEWS SLIDER
       Desktop: arrow controls
       Mobile: native touch scrolling
    ===================================================== */

    document.querySelectorAll(".reviews-slider-wrapper").forEach(function (wrapper) {

        const slider = wrapper.querySelector(".reviews-slider");
        const track = wrapper.querySelector(".reviews-track");
        const previousButton = wrapper.querySelector(".review-prev");
        const nextButton = wrapper.querySelector(".review-next");

        if (!slider || !track) return;

        const mobileView = window.matchMedia("(max-width: 600px)");
        let position = 0;

        function getStep() {
            const card = track.querySelector(".review-card");
            if (!card) return 0;

            const styles = window.getComputedStyle(track);
            const gap = parseFloat(styles.columnGap || styles.gap) || 0;

            return card.getBoundingClientRect().width + gap;
        }

        function getMaxPosition() {
            const step = getStep();
            const maxScroll = Math.max(0, track.scrollWidth - slider.clientWidth);

            if (!step || !maxScroll) return 0;

            return Math.ceil(maxScroll / step);
        }

        function updateButtons() {
            if (previousButton) previousButton.disabled = position <= 0;
            if (nextButton) nextButton.disabled = position >= getMaxPosition();
        }

        function updateDesktopSlider() {
            position = Math.max(0, Math.min(position, getMaxPosition()));

            const distance = Math.min(
                position * getStep(),
                Math.max(0, track.scrollWidth - slider.clientWidth)
            );

            track.style.transform = "translateX(-" + distance + "px)";
            updateButtons();
        }

        function updateSliderMode() {
            if (mobileView.matches) {
                track.style.transform = "none";
                track.style.transition = "none";

                slider.style.overflowX = "auto";
                slider.style.overflowY = "hidden";
                slider.style.webkitOverflowScrolling = "touch";
                slider.style.touchAction = "pan-x pan-y";

                position = 0;
                updateButtons();
            } else {
                slider.style.overflowX = "hidden";
                slider.style.overflowY = "hidden";
                slider.style.webkitOverflowScrolling = "";

                track.style.transition = "";
                position = 0;

                updateDesktopSlider();
            }
        }

        if (nextButton) {
            nextButton.addEventListener("click", function () {
                if (mobileView.matches) return;

                position++;
                updateDesktopSlider();
            });
        }

        if (previousButton) {
            previousButton.addEventListener("click", function () {
                if (mobileView.matches) return;

                position--;
                updateDesktopSlider();
            });
        }

        window.addEventListener("resize", function () {
            if (mobileView.matches) {
                track.style.transform = "none";
            } else {
                updateDesktopSlider();
            }
        });

        if (mobileView.addEventListener) {
            mobileView.addEventListener("change", updateSliderMode);
        } else {
            mobileView.addListener(updateSliderMode);
        }

        updateSliderMode();
    });


    /* =====================================================
       9. GOOGLE REVIEWS - READ MORE / HIDE
    ===================================================== */

    document.addEventListener("click", function (event) {
        const button = event.target.closest(".read-more-btn");
        if (!button) return;

        const card = button.closest(".review-card");
        if (!card) return;

        const text = card.querySelector(".review-text");
        if (!text) return;

        const collapsed = text.classList.toggle("collapsed");
        button.textContent = collapsed ? "Read more" : "Hide";
    });


    /* =====================================================
       10. GET A QUOTE - BLINK WHEN NEAR
       Works on mobile and desktop
    ===================================================== */

    const quoteOffer = document.getElementById("quoteOffer");

    if (quoteOffer) {
        const quoteContent = quoteOffer.querySelector(".quote-content") || quoteOffer;
        let quoteWasNear = false;

        function checkQuotePosition() {
            const rect = quoteOffer.getBoundingClientRect();
            const buffer = 150;

            const isNear =
                rect.top < window.innerHeight + buffer &&
                rect.bottom > -buffer;

            if (isNear && !quoteWasNear) {
                quoteContent.classList.remove("quote-near");

                // Restart the CSS animation each time the section comes near.
                void quoteContent.offsetWidth;

                quoteContent.classList.add("quote-near");
            }

            if (!isNear && quoteWasNear) {
                quoteContent.classList.remove("quote-near");
            }

            quoteWasNear = isNear;
        }

        if ("IntersectionObserver" in window) {
            const quoteObserver = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        quoteContent.classList.remove("quote-near");
                        void quoteContent.offsetWidth;
                        quoteContent.classList.add("quote-near");
                        quoteWasNear = true;
                    } else {
                        quoteContent.classList.remove("quote-near");
                        quoteWasNear = false;
                    }
                });
            }, {
                rootMargin: "150px 0px",
                threshold: 0
            });

            quoteObserver.observe(quoteOffer);
        } else {
            window.addEventListener("scroll", checkQuotePosition, { passive: true });
            window.addEventListener("resize", checkQuotePosition);
            checkQuotePosition();
        }
    }

});



