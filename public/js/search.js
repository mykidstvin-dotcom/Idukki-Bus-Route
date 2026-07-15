document.addEventListener("DOMContentLoaded", () => {

    const searchBtn = document.getElementById("searchBtn");

    searchBtn.addEventListener("click", () => {

        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;

        if (from === "" || to === "") {
            alert("Please select both From and To locations.");
            return;
        }

        if (from === to) {
            alert("From and To cannot be the same.");
            return;
        }

        window.location.href =
            `/search-results?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;

    });

});