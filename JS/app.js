
// Reusable Toast Notification Function

function showToast(message) {

    let toast = document.createElement("div");

    toast.className = "toast";
    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(function() {
        toast.remove();
    }, 3000);
}


// Smooth Scrolling and Book Button Interaction

document.addEventListener("DOMContentLoaded", function() {

    const bookButtons = document.querySelectorAll(".book-btn");

    bookButtons.forEach(function(button) {

        button.addEventListener("click", function() {

            // Navigate to booking page
            // Booking page will show the toast and scroll to form

        });

    });

    // Check whether booking page was opened
    if (window.location.hash === "#booking") {

        const bookingSection = document.getElementById("booking");

        if (bookingSection) {

            bookingSection.scrollIntoView({
                behavior: "smooth"
            });

            showToast("Booking form opened successfully!");

        }
    }

});

console.log("JavaScript is connected successfully!");
// Activity 7: Live Booking Summary

document.addEventListener("DOMContentLoaded", function () {

    const matchSelect = document.getElementById("match");
    const standSelect = document.getElementById("stand");
    const quantityInput = document.querySelector("#quantity");

    const summaryMatch = document.getElementById("summaryMatch");
    const summaryStand = document.getElementById("summaryStand");
    const summaryQuantity = document.getElementById("summaryQuantity");
    const totalPrice = document.getElementById("totalPrice");

    function updateSummary() {

        const match = matchSelect.options[matchSelect.selectedIndex].text;
        const stand = standSelect.options[standSelect.selectedIndex].text;

        const price = Number(standSelect.value) || 0;
        const quantity = Number(quantityInput.value) || 1;

        const total = price * quantity;

        summaryMatch.textContent = match;
        summaryStand.textContent = stand;
        summaryQuantity.textContent = quantity;
        totalPrice.textContent = total;

        showToast("Booking summary updated!");
    }

    matchSelect.addEventListener("change", updateSummary);
    standSelect.addEventListener("change", updateSummary);
    quantityInput.addEventListener("change", updateSummary);

});
// Activity 8: Responsive Layout

document.addEventListener("DOMContentLoaded", function () {

    // Team Filter
    const teamFilter = document.getElementById("team");
    const matchCards = document.querySelectorAll(".match-card");

    if (teamFilter) {
        teamFilter.addEventListener("change", function () {
            const selectedTeam = teamFilter.value;

            matchCards.forEach(function (card) {
                const teams = card.dataset.teams.split(" ");

                card.style.display =
                    selectedTeam === "all" || teams.includes(selectedTeam)
                    ? "block"
                    : "none";
            });
        });
    }

    // Grid and List View
    const matchContainer = document.getElementById("matchCards");
    const gridView = document.getElementById("gridView");
    const listView = document.getElementById("listView");

    if (matchContainer && gridView && listView) {
        gridView.addEventListener("click", function () {
            matchContainer.classList.remove("list-view");
        });

        listView.addEventListener("click", function () {
            matchContainer.classList.add("list-view");
        });
    }

    // Hamburger Menu
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", function () {
            mainNav.classList.toggle("active");
        });
    }

});
