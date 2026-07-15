function showToast(message, color = "#16a34a") {

    Toastify({

        text: message,

        duration: 3000,

        gravity: "top",

        position: "right",

        close: true,

        stopOnFocus: true,

        style: {
            background: color
        }

    }).showToast();

}
const form = document.getElementById("busForm");
const addStopBtn = document.getElementById("addStopBtn");
const stopsContainer = document.getElementById("stopsContainer");

addStopBtn.addEventListener("click", () => {

    const row = document.createElement("div");

    row.className = "stop-row";

    row.innerHTML = `

        <input
            type="text"
            class="stop-name"
            placeholder="Stop Name"
        >

        <input
            type="time"
            class="stop-time"
        >

    `;

    stopsContainer.appendChild(row);

});

let editMode = false;
let editingBusId = null;
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const bus = {

        busName: document.getElementById("busName").value,

        operator: document.getElementById("operator").value,

        type: document.getElementById("type").value,

        from: document.getElementById("from").value,

        to: document.getElementById("to").value,

        departure: document.getElementById("departure").value,

        arrival: document.getElementById("arrival").value,

        stops: Array.from(document.querySelectorAll(".stop-row")).map(row => ({

    name: row.querySelector(".stop-name").value,

    time: row.querySelector(".stop-time").value

}))
    };

    let response;

if (editMode) {

    response = await fetch(`/api/buses/${editingBusId}`, {

        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bus)

    });

} else {

    response = await fetch("/api/buses", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(bus)

    });

}

  if (response.ok) {

   showToast(
    editMode
        ? "✅ Bus updated successfully!"
        : "✅ Bus added successfully!",
    "#16a34a"
);

    form.reset();

    editMode = false;
    editingBusId = null;

    document.getElementById("saveBusBtn").textContent = "Save Bus";

    loadBuses();

} else {

  showToast("❌ Operation failed.", "#dc2626");

}

});
async function loadBuses() {

    const response = await fetch("/api/buses");
    const buses = await response.json();
    // Dashboard Statistics

document.getElementById("totalBuses").textContent = buses.length;

document.getElementById("runningBuses").textContent =
    buses.filter(bus => bus.status === "🟢 Running").length;

document.getElementById("ksrtcBuses").textContent =
    buses.filter(bus =>
        bus.operator.toLowerCase().includes("ksrtc")
    ).length;

document.getElementById("privateBuses").textContent =
    buses.filter(bus =>
        !bus.operator.toLowerCase().includes("ksrtc")
    ).length;

    const busList = document.getElementById("busList");

    busList.innerHTML = "";

    buses.forEach(bus => {

        busList.innerHTML += `
       
 <div class="bus-card">

    <h3>${bus.busName}</h3>

    <p><strong>Route:</strong> ${bus.from} → ${bus.to}</p>

    <p><strong>Time:</strong> ${bus.departure} → ${bus.arrival}</p>

    <div class="bus-actions">

        <button class="edit-btn"
    onclick="editBus('${bus._id}')">
    ✏ Edit
</button>
        <button class="delete-btn"
            onclick="deleteBus('${bus._id}')">
            🗑 Delete
        </button>

    </div>

</div>
        `;

    });

}

loadBuses();
async function deleteBus(id) {

    const confirmDelete = confirm("Are you sure you want to delete this bus?");

    if (!confirmDelete) return;

    try {

        const response = await fetch(`/api/buses/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        showToast(data.message, "#16a34a");

        loadBuses();

    } catch (error) {

        showToast("❌ Failed to delete bus.", "#dc2626");
        console.error(error);

    }

}
async function editBus(id) {

    const response = await fetch(`/api/buses/${id}`);
    const bus = await response.json();

    document.getElementById("busName").value = bus.busName;
    document.getElementById("operator").value = bus.operator;
    document.getElementById("type").value = bus.type;
    document.getElementById("from").value = bus.from;
    document.getElementById("to").value = bus.to;
    document.getElementById("departure").value = bus.departure;
    document.getElementById("arrival").value = bus.arrival;
  stopsContainer.innerHTML = "";

bus.stops.forEach(stop => {

    const row = document.createElement("div");

    row.className = "stop-row";

    row.innerHTML = `
        <input
            type="text"
            class="stop-name"
            placeholder="Stop Name"
            value="${stop.name}"
        >

        <input
            type="time"
            class="stop-time"
            value="${stop.time}"
        >
    `;

    stopsContainer.appendChild(row);

});

    editMode = true;
    editingBusId = bus._id;

    document.getElementById("saveBusBtn").textContent = "Update Bus";
}
const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {

    logoutBtn.addEventListener("click", async () => {

        await fetch("/api/auth/logout", {
            method: "POST"
        });

        window.location.href = "/login";

    });

}