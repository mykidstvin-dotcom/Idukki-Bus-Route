const params = new URLSearchParams(window.location.search);

const from = params.get("from") || "Unknown";
const to = params.get("to") || "Unknown";


// Update header
document.getElementById("route-title").textContent = `${from} → ${to}`;


// Dummy data (Later this will come from MongoDB)
async function loadBuses() {

    const response = await fetch("/api/buses");

    const allBuses = await response.json();

    const buses = allBuses.filter(bus =>
        bus.from === from &&
        bus.to === to
    );

    document.getElementById("bus-count").textContent =
        `${buses.length} buses available`;

    const container = document.getElementById("results-container");
    container.innerHTML = "";

    buses.forEach(bus => {

        container.innerHTML += `
        <div class="bus-card">

            <div class="bus-name">
                🚌 ${bus.busName}
            </div>

            <div class="bus-info">

                <div class="info-box">
                    <h4>Departure</h4>
                    <p>${bus.departure}</p>
                </div>

           <div class="bus-route">
    <strong>Route:</strong>
    ${bus.from} → ${bus.to}
</div>

<div class="bus-times">
    <span><strong>Departure:</strong> ${bus.departure}</span>
    <span><strong>Arrival:</strong> ${bus.arrival}</span>
</div>

            <div class="bus-footer">

                <div class="status">
                    ${bus.status}
                </div>

               <a href="/route-details?id=${bus._id}" class="view-route">
    View Full Route →
</a>

            </div>

        </div>
        `;
    });

}

loadBuses();