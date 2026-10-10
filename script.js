
/* =========================================================
   LEGACY ESTIMATING - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   STICKY NAVBAR SHRINK
========================================================= */

const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 50);
    }
});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {

    menuBtn.addEventListener("click", function () {

        navLinks.classList.toggle("show");

        const icon = menuBtn.querySelector("i");

        if (icon) {
            icon.classList.toggle(
                "fa-xmark",
                navLinks.classList.contains("show")
            );

            icon.classList.toggle(
                "fa-bars",
                !navLinks.classList.contains("show")
            );
        }

    });

    navLinks.querySelectorAll("a").forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            if (icon) {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }

        });

    });

}


/* =========================================================
   HERO SLIDER
========================================================= */

const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

let currentSlide = 0;

function showSlide(index) {

    if (!slides.length) return;

    if (index >= slides.length) {
        currentSlide = 0;
    } else if (index < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = index;
    }

    slides.forEach(function (slide) {
        slide.classList.remove("active");
    });

    dots.forEach(function (dot) {
        dot.classList.remove("active");
    });

    slides[currentSlide].classList.add("active");

    if (dots[currentSlide]) {
        dots[currentSlide].classList.add("active");
    }

}

if (nextBtn) {
    nextBtn.addEventListener("click", function () {
        showSlide(currentSlide + 1);
    });
}

if (prevBtn) {
    prevBtn.addEventListener("click", function () {
        showSlide(currentSlide - 1);
    });
}

dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        showSlide(index);
    });
});

/* Automatic Hero Slider */

if (slides.length > 1) {
    setInterval(function () {
        showSlide(currentSlide + 1);
    }, 4000);
}


/* =========================================================
   COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");
const counterSection = document.querySelector(".counter-section");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    counterStarted = true;

    counters.forEach(function (counter) {

        const target = Number(counter.dataset.target);

        if (!Number.isFinite(target) || target < 0) return;

        const duration = 1800;
        const startTime = performance.now();

        function updateCounter(now) {

            const progress = Math.min(
                (now - startTime) / duration,
                1
            );

            const current = Math.floor(target * progress);

            counter.textContent =
                current.toLocaleString() + "+";

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent =
                    target.toLocaleString() + "+";
            }

        }

        requestAnimationFrame(updateCounter);

    });

}

if (counterSection && "IntersectionObserver" in window) {

    const counterObserver = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {
                    startCounters();
                    counterObserver.unobserve(counterSection);
                }

            });

        },
        {
            threshold: 0.35
        }
    );

    counterObserver.observe(counterSection);

}


/* =========================================================
   TRADES SEARCH
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("tradeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchMessage = document.getElementById("searchMessage");

    if (!searchForm || !searchInput) return;

    const tradePages = {

        /* Home */
        "legacy": "index.html",
        "legacy estimating": "index.html",
        "home": "index.html",

        /* Electrical */
        "electrical": "trades/electrical-estimating.html",
        "electrical estimating": "trades/electrical-estimating.html",
        "electrical takeoff": "trades/electrical-takeoff.html",

        /* Mechanical */
        "mechanical": "trades/mechanical-estimating.html",
        "mechanical estimating": "trades/mechanical-estimating.html",
        "mechanical takeoff": "trades/mechanical-takeoff.html",

        /* Plumbing */
        "plumbing": "trades/plumbing-estimating.html",
        "plumbing estimating": "trades/plumbing-estimating.html",
        "plumbing takeoff": "trades/plumbing-takeoff.html",

        /* Drywall */
        "drywall": "trades/drywall-estimating.html",
        "drywall estimating": "trades/drywall-estimating.html",
        "drywall takeoff": "trades/drywall-takeoff.html",

        /* Masonry */
        "masonry": "trades/masonry-estimating.html",
        "masonry estimating": "trades/masonry-estimating.html",
        "masonry takeoff": "trades/masonry-takeoff.html",

        /* Lumber */
        "lumber": "trades/lumber-estimating.html",
        "lumber estimating": "trades/lumber-estimating.html",
        "lumber takeoff": "trades/lumber-takeoff.html",

        /* Metals */
        "metals": "trades/metals-estimating.html",
        "metals estimating": "trades/metals-estimating.html",
        "metals takeoff": "trades/metals-takeoff.html",

        /* Concrete */
        "concrete": "trades/concrete-estimating.html",
        "concrete estimating": "trades/concrete-estimating.html",
        "concrete takeoff": "trades/concrete-takeoff.html",

        /* Roofing */
        "roofing": "trades/roofing-estimating.html",
        "roofing estimating": "trades/roofing-estimating.html",
        "roofing takeoff": "trades/roofing-takeoff.html",

        /* Site Work */
        "site": "trades/site-work-estimating.html",
        "site work": "trades/site-work-estimating.html",
        "site work estimating": "trades/site-work-estimating.html",
        "site work takeoff": "trades/site-work-takeoff.html",

        /* Insulation */
        "insulation": "trades/insulation-estimating.html",
        "insulation estimating": "trades/insulation-estimating.html",
        "insulation takeoff": "trades/insulation-takeoff.html",

        /* Interior */
        "interior": "trades/interior-estimating.html",
        "interior estimating": "trades/interior-estimating.html",
        "interior takeoff": "trades/interior-takeoff.html",

        /* Flooring */
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
                searchMessage.textContent =
                    "Please enter a search term.";
            }
            return;
        }

        /* Exact Match */

        if (tradePages[query]) {
            window.location.href = tradePages[query];
            return;
        }

        /* Partial Match */

        const result = Object.keys(tradePages).find(function (page) {
            return page.includes(query);
        });

        if (result) {
            window.location.href = tradePages[result];
            return;
        }

        /* No Result */

        if (searchMessage) {
            searchMessage.textContent =
                "No matching page found.";
        }

    });

});


/* =========================================================
   HERO SLIDER - MOBILE TOUCH SWIPE
========================================================= */

const heroSlider = document.querySelector(".hero");

let heroTouchStartX = 0;
let heroTouchStartY = 0;

if (heroSlider) {

    heroSlider.addEventListener("touchstart", function (event) {

        if (!event.touches.length) return;

        heroTouchStartX = event.touches[0].clientX;
        heroTouchStartY = event.touches[0].clientY;

    }, { passive: true });

    heroSlider.addEventListener("touchend", function (event) {

        if (!event.changedTouches.length) return;

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;

        const differenceX = endX - heroTouchStartX;
        const differenceY = endY - heroTouchStartY;

        /* Ignore vertical scrolling */

        if (Math.abs(differenceX) < 50) return;
        if (Math.abs(differenceX) < Math.abs(differenceY)) return;

        if (differenceX < 0) {
            showSlide(currentSlide + 1);
        } else {
            showSlide(currentSlide - 1);
        }

    }, { passive: true });

}


/* =========================================================
   BASIC CONTENT PROTECTION
========================================================= */

/* Disable right-click */

document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

/* Disable dragging images */

document.addEventListener("dragstart", function (event) {

    if (event.target.closest("img")) {
        event.preventDefault();
    }

});

/* Disable image dragging */

document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
});

/* Disable text selection on selected elements */

document.querySelectorAll(".protected-content").forEach(function (element) {
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
});

/* Block selected keyboard shortcuts */

document.addEventListener("keydown", function (event) {

    const key = event.key.toLowerCase();

    if (
        (event.ctrlKey || event.metaKey) &&
        ["u", "s", "c"].includes(key)
    ) {
        event.preventDefault();
    }

}, true);


/* =========================================================
   GOOGLE REVIEWS SLIDER
   DESKTOP: ARROW CONTROLS
   MOBILE: NATIVE TOUCH SWIPE
========================================================= */

document.querySelectorAll(".reviews-slider-wrapper").forEach(function (wrapper) {

    const slider = wrapper.querySelector(".reviews-slider");
    const track = wrapper.querySelector(".reviews-track");
    const prevBtn = wrapper.querySelector(".review-prev");
    const nextBtn = wrapper.querySelector(".review-next");

    if (!slider || !track) return;

    const mobileView = window.matchMedia("(max-width: 600px)");

    let position = 0;

    /* Card width + gap */

    function getStep() {

        const card = track.querySelector(".review-card");

        if (!card) return 0;

        const gap = parseFloat(
            window.getComputedStyle(track).gap
        ) || 0;

        return card.getBoundingClientRect().width + gap;

    }

    /* Maximum desktop slide position */

    function getMaxPosition() {

        const step = getStep();

        const maxScroll = Math.max(
            0,
            track.scrollWidth - slider.clientWidth
        );

        if (step <= 0 || maxScroll <= 0) return 0;

        return Math.ceil(maxScroll / step);

    }

    /* Update arrow states */

    function updateButtons() {

        const maxPosition = getMaxPosition();

        if (prevBtn) {
            prevBtn.disabled = position <= 0;
        }

        if (nextBtn) {
            nextBtn.disabled = position >= maxPosition;
        }

    }

    /* Desktop slider movement */

    function updateDesktopSlider() {

        const maxPosition = getMaxPosition();

        position = Math.max(
            0,
            Math.min(position, maxPosition)
        );

        const distance = Math.min(
            position * getStep(),
            Math.max(0, track.scrollWidth - slider.clientWidth)
        );

        track.style.transform =
            "translateX(-" + distance + "px)";

        updateButtons();

    }

    /* Mobile uses native scrolling, not transform */

    function updateSliderMode() {

        if (mobileView.matches) {

            /* Reset desktop movement */

            track.style.transform = "none";
            track.style.transition = "none";

            /* Enable horizontal touch scrolling */

            slider.style.overflowX = "auto";
            slider.style.overflowY = "hidden";
            slider.style.webkitOverflowScrolling = "touch";

            position = 0;

            updateButtons();

        } else {

            /* Restore desktop arrow slider */

            slider.style.overflowX = "hidden";
            slider.style.overflowY = "hidden";
            slider.style.webkitOverflowScrolling = "";

            track.style.transition = "";

            position = 0;

            updateDesktopSlider();

        }

    }

    /* Next arrow */

    if (nextBtn) {

        nextBtn.addEventListener("click", function () {

            if (mobileView.matches) return;

            position++;
            updateDesktopSlider();

        });

    }

    /* Previous arrow */

    if (prevBtn) {

        prevBtn.addEventListener("click", function () {

            if (mobileView.matches) return;

            position--;
            updateDesktopSlider();

        });

    }

    /* Update layout when screen size changes */

    window.addEventListener("resize", function () {

        if (mobileView.matches) {

            track.style.transform = "none";

        } else {

            updateDesktopSlider();

        }

    });

    /* React to crossing the mobile breakpoint */

    if (mobileView.addEventListener) {

        mobileView.addEventListener("change", updateSliderMode);

    } else {

        /* Older browser support */

        mobileView.addListener(updateSliderMode);

    }

    /* Start correct slider mode */

    updateSliderMode();

});


/* =========================================================
   GOOGLE REVIEWS - READ MORE / HIDE
========================================================= */

document.addEventListener("click", function (event) {

    const button = event.target.closest(".read-more-btn");

    if (!button) return;

    const card = button.closest(".review-card");

    if (!card) return;

    const text = card.querySelector(".review-text");

    if (!text) return;

    const isCollapsed = text.classList.toggle("collapsed");

    button.textContent = isCollapsed ? "Read more" : "Hide";

});






/* =========================================
   BASIC CONTENT PROTECTION
========================================= */

// Disable right-click
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Disable image dragging
document.addEventListener("dragstart", function (event) {
    if (event.target.closest("img")) {
        event.preventDefault();
    }
});

// Disable image selection
document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
});

// Disable text selection on protected content
document.querySelectorAll(".protected-content").forEach(function (element) {
    element.style.userSelect = "none";
    element.style.webkitUserSelect = "none";
});

// Block selected keyboard shortcuts
document.addEventListener("keydown", function (event) {
    const key = event.key.toLowerCase();

    if (
        (event.ctrlKey || event.metaKey) &&
        ["u", "s", "c"].includes(key)
    ) {
        event.preventDefault();
    }
}, true);

