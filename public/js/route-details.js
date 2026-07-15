// ===============================
// ROUTE DETAILS
// ===============================

// Dummy data (Later this will come from MongoDB)
const params = new URLSearchParams(window.location.search);

const busId = params.get("id");

async function loadRoute() {

    const response = await fetch(`/api/buses/${busId}`);
    const bus = await response.json();

    document.getElementById("bus-name").textContent = bus.busName;
    document.getElementById("departure-time").textContent = bus.departure;
    document.getElementById("bus-type").textContent = bus.type;

    const container = document.getElementById("route-stops");
    container.innerHTML = "";

    // Starting point
    container.innerHTML += `
        <div class="route-stop">
            <div class="stop-time">Start</div>
            <div class="stop-dot"></div>
            <div class="stop-name">${bus.from}</div>
        </div>
    `;

    // Via stops
    bus.stops.forEach(stop => {

        container.innerHTML += `
            <div class="route-stop">
                <div class="stop-time">${stop.time}</div>
                <div class="stop-dot"></div>
                <div class="stop-name">${stop.name}</div>
            </div>
        `;

    });

    // Destination
    container.innerHTML += `
        <div class="route-stop">
            <div class="stop-time">End</div>
            <div class="stop-dot"></div>
            <div class="stop-name">${bus.to}</div>
        </div>
    `;

    // Back button
    document.getElementById("backBtn").href =
        `/search-results?from=${encodeURIComponent(bus.from)}&to=${encodeURIComponent(bus.to)}`;

}

loadRoute();
// Fill Bus Details

document.getElementById("bus-name").textContent = bus.name;
document.getElementById("departure-time").textContent = bus.departure;
document.getElementById("bus-type").textContent = bus.type;

// Route Stops

const container = document.getElementById("route-stops");

bus.stops.forEach(stop => {

    container.innerHTML += `

    <div class="route-stop">

        <div class="stop-time">${stop.time}</div>

        <div class="stop-dot"></div>

        <div class="stop-name">${stop.name}</div>

    </div>

    `;

});
