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

        button.addEventListener("click", function(event) {

            event.preventDefault();

            const bookingSection = document.getElementById("booking");

            if (bookingSection) {

                bookingSection.scrollIntoView({
                    behavior: "smooth"
                });

                showToast("Booking form opened successfully!");

            }

        });

    });

});

console.log("JavaScript is connected successfully!");