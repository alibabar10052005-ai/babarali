
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

    }, 5000);

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
   GOOGLE REVIEWS - MOBILE TOUCH SWIPE
========================================================= */

if (reviewsTrack) {

    let touchStartX = 0;
    let touchEndX = 0;

    reviewsTrack.addEventListener(
        "touchstart",
        function (event) {

            touchStartX = event.touches[0].clientX;

        },
        { passive: true }
    );


    reviewsTrack.addEventListener(
        "touchend",
        function (event) {

            touchEndX = event.changedTouches[0].clientX;

            const difference = touchStartX - touchEndX;

            if (Math.abs(difference) < 50) {
                return;
            }

            const card = reviewsTrack.querySelector(".review-card");

            if (!card) {
                return;
            }

            const cardWidth = card.offsetWidth + 14;

            if (difference > 0) {
                reviewIndex++;
            } else {
                reviewIndex--;
            }

            if (reviewIndex < 0) {
                reviewIndex = reviewCards.length - 1;
            }

            if (reviewIndex >= reviewCards.length) {
                reviewIndex = 0;
            }

            reviewsTrack.style.transform =
                `translateX(-${reviewIndex * cardWidth}px)`;

        },
        { passive: true }
    );

}











