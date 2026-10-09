
/* =========================================================
   LEGACY ESTIMATING - MAIN JAVASCRIPT
========================================================= */


/* =========================================================
   STICKY NAVBAR SHRINK
========================================================= */

const header = document.getElementById("mainHeader");

window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

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

        if (navLinks.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });


    /* CLOSE MENU AFTER CLICKING LINK */

    const links = navLinks.querySelectorAll("a");

    links.forEach(function (link) {

        link.addEventListener("click", function () {

            navLinks.classList.remove("show");

            const icon = menuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

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


/* SHOW SLIDE */

function showSlide(index) {

    if (!slides.length) {
        return;
    }

    if (index >= slides.length) {
        currentSlide = 0;
    }

    else if (index < 0) {
        currentSlide = slides.length - 1;
    }

    else {
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


/* NEXT */

if (nextBtn) {

    nextBtn.addEventListener("click", function () {

        showSlide(currentSlide + 1);

    });

}


/* PREVIOUS */

if (prevBtn) {

    prevBtn.addEventListener("click", function () {

        showSlide(currentSlide - 1);

    });

}


/* DOTS */

dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {

        showSlide(index);

    });

});


/* AUTO SLIDER */

if (slides.length > 1) {

    setInterval(function () {

        showSlide(currentSlide + 1);

    }, 4000);

}


/* =========================================================
   COUNTERS
========================================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;


function startCounters() {

    if (counterStarted) {
        return;
    }

    counterStarted = true;


    counters.forEach(function (counter) {

        const target = Number(counter.dataset.target);

        let current = 0;

        const duration = 1800;

        const increment = target / (duration / 16);


        function updateCounter() {

            current += increment;

            if (current < target) {

                counter.textContent =
                    Math.floor(current).toLocaleString() + "+";

                requestAnimationFrame(updateCounter);

            } else {

                counter.textContent =
                    target.toLocaleString() + "+";

            }

        }


        updateCounter();

    });

}


/* COUNTER OBSERVER */

const counterSection =
    document.querySelector(".counter-section");


if (counterSection) {

    const counterObserver =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        startCounters();

                        counterObserver.unobserve(
                            counterSection
                        );

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
   GOOGLE REVIEWS SLIDER
========================================================= */

const reviewsTrack =
    document.querySelector(".reviews-track");

const reviewCards =
    document.querySelectorAll(".review-card");

let reviewIndex = 0;


function moveReviews() {

    if (!reviewsTrack || reviewCards.length <= 1) {
        return;
    }


    const cardWidth =
        reviewCards[0].offsetWidth + 18;


    reviewIndex++;


    /*
       4 reviews available.
       Reset when the last card is reached.
    */

    if (reviewIndex >= reviewCards.length) {

        reviewIndex = 0;

    }


    reviewsTrack.style.transform =
        `translateX(-${reviewIndex * cardWidth}px)`;

}


/* AUTO REVIEWS */

if (reviewCards.length > 1) {

    setInterval(function () {

        moveReviews();

    }, 4000);

}


/* =========================================================
   RESET REVIEW SLIDER ON RESIZE
========================================================= */

window.addEventListener("resize", function () {

    if (reviewsTrack) {

        reviewIndex = 0;

        reviewsTrack.style.transform =
            "translateX(0)";

    }

});


/* =========================================================
   TRADES SEARCH
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.getElementById("tradeSearch");
    const searchInput = document.getElementById("searchInput");
    const searchMessage = document.getElementById("searchMessage");


    // Agar current page par search form nahi hai
    // to code yahin stop ho jayega.
    if (!searchForm || !searchInput) {
        return;
    }


    /* =====================================================
       SEARCH PAGES
    ===================================================== */

    const tradePages = {

        /* Home */

        "legacy":
            "index.html",

        "legacy estimating":
            "index.html",

        "home":
            "index.html",


        /* Electrical */

        "electrical":
            "trades/electrical-estimating.html",

        "electrical estimating":
            "trades/electrical-estimating.html",

        "electrical takeoff":
            "trades/electrical-takeoff.html",


        /* Mechanical */

        "mechanical":
            "trades/mechanical-estimating.html",

        "mechanical estimating":
            "trades/mechanical-estimating.html",

        "mechanical takeoff":
            "trades/mechanical-takeoff.html",


        /* Plumbing */

        "plumbing":
            "trades/plumbing-estimating.html",

        "plumbing estimating":
            "trades/plumbing-estimating.html",

        "plumbing takeoff":
            "trades/plumbing-takeoff.html",


        /* Drywall */

        "drywall":
            "trades/drywall-estimating.html",

        "drywall estimating":
            "trades/drywall-estimating.html",

        "drywall takeoff":
            "trades/drywall-takeoff.html",


        /* Masonry */

        "masonry":
            "trades/masonry-estimating.html",

        "masonry estimating":
            "trades/masonry-estimating.html",

        "masonry takeoff":
            "trades/masonry-takeoff.html",


        /* Lumber */

        "lumber":
            "trades/lumber-estimating.html",

        "lumber estimating":
            "trades/lumber-estimating.html",

        "lumber takeoff":
            "trades/lumber-takeoff.html",


        /* Metals */

        "metals":
            "trades/metals-estimating.html",

        "metals estimating":
            "trades/metals-estimating.html",

        "metals takeoff":
            "trades/metals-takeoff.html",


        /* Concrete */

        "concrete":
            "trades/concrete-estimating.html",

        "concrete estimating":
            "trades/concrete-estimating.html",

        "concrete takeoff":
            "trades/concrete-takeoff.html",


        /* Roofing */

        "roofing":
            "trades/roofing-estimating.html",

        "roofing estimating":
            "trades/roofing-estimating.html",

        "roofing takeoff":
            "trades/roofing-takeoff.html",


        /* Site Work */

        "site":
            "trades/site-work-estimating.html",

        "site work":
            "trades/site-work-estimating.html",

        "site work estimating":
            "trades/site-work-estimating.html",

        "site work takeoff":
            "trades/site-work-takeoff.html",


        /* Insulation */

        "insulation":
            "trades/insulation-estimating.html",

        "insulation estimating":
            "trades/insulation-estimating.html",

        "insulation takeoff":
            "trades/insulation-takeoff.html",


        /* Interior */

        "interior":
            "trades/interior-estimating.html",

        "interior estimating":
            "trades/interior-estimating.html",

        "interior takeoff":
            "trades/interior-takeoff.html",


        /* Flooring */

        "flooring":
            "trades/flooring-estimating.html",

        "flooring estimating":
            "trades/flooring-estimating.html",

        "flooring takeoff":
            "trades/flooring-takeoff.html"

    };


    /* =====================================================
       SEARCH SUBMIT
    ===================================================== */

    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();


        const query = searchInput.value
            .trim()
            .toLowerCase();


        if (searchMessage) {
            searchMessage.textContent = "";
        }


        /* Empty search */

        if (query === "") {

            if (searchMessage) {
                searchMessage.textContent =
                    "Please enter a search term.";
            }

            return;
        }


        /* =================================================
           EXACT MATCH
        ================================================= */

        if (tradePages[query]) {

            window.location.href =
                tradePages[query];

            return;
        }


        /* =================================================
           PARTIAL MATCH
        ================================================= */

        const result = Object.keys(tradePages).find(function (page) {

            return page.includes(query);

        });


        if (result) {

            window.location.href =
                tradePages[result];

            return;
        }


        /* =================================================
           NO RESULT
        ================================================= */

        if (searchMessage) {

            searchMessage.textContent =
                "No matching page found.";

        }

    });

});




/* =========================================================
   MOBILE TOUCH SWIPE
========================================================= */

const heroSlider = document.querySelector(".hero");

let touchStartX = 0;
let touchEndX = 0;

if (heroSlider) {

    heroSlider.addEventListener("touchstart", function (e) {

        touchStartX = e.touches[0].clientX;

    }, { passive: true });


    heroSlider.addEventListener("touchend", function (e) {

        touchEndX = e.changedTouches[0].clientX;

        const swipeDistance = touchEndX - touchStartX;


        /* =========================
           SWIPE LEFT = NEXT
        ========================= */

        if (swipeDistance < -50) {

            showSlide(currentSlide + 1);

        }


        /* =========================
           SWIPE RIGHT = PREVIOUS
        ========================= */

        if (swipeDistance > 50) {

            showSlide(currentSlide - 1);

        }

    }, { passive: true });

}








/* =========================================
   BASIC CONTENT PROTECTION
========================================= */

// Disable right-click
document.addEventListener("contextmenu", function (e) {
    e.preventDefault();
});

// Disable dragging images
document.addEventListener("dragstart", function (e) {
    if (e.target.closest("img")) {
        e.preventDefault();
    }
});

// Disable image selection and dragging
document.querySelectorAll("img").forEach(function (img) {
    img.setAttribute("draggable", "false");
});

// Disable text selection where CSS class is applied
document.querySelectorAll(".protected-content").forEach(function (el) {
    el.style.userSelect = "none";
    el.style.webkitUserSelect = "none";
});









document.addEventListener("keydown", function (e) {
    const key = e.key.toLowerCase();

    if (
        (e.ctrlKey || e.metaKey) &&
        (key === "u" || key === "s" || key === "c")
    ) {
        e.preventDefault();
        e.stopImmediatePropagation();
    }
}, true);
