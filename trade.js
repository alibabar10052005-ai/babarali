/* Trade detail page JavaScript
   Safe to use with your existing single script.js. */

document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.querySelector(".search-box");
    const searchInput = document.querySelector(".search-box input");

    if (searchForm && searchInput) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const query = searchInput.value.trim().toLowerCase();

            if (!query) return;

            const links = document.querySelectorAll(".trade-sidebar a");

            for (const link of links) {
                if (link.textContent.toLowerCase().includes(query)) {
                    link.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });
                    link.style.color = "#087d9e";
                    setTimeout(() => {
                        link.style.color = "";
                    }, 1500);
                    return;
                }
            }

            alert("No matching result found.");
        });
    }
});
