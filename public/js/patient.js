// patient.js - Viewing medical records

document.addEventListener("DOMContentLoaded", async () => {
    const recordsContainer = document.getElementById("recordsContainer");

    const response = await fetch("/api/patient/records");
    const records = await response.json();

    if (recordsContainer) {
        records.forEach((record) => {
            const recordElement = document.createElement("div");
            recordElement.classList.add("record");
            recordElement.innerHTML = `
                <h3>${record.diagnosis}</h3>
                <p>Treatment: ${record.treatment}</p>
                <small>Date: ${record.date}</small>
            `;
            recordsContainer.appendChild(recordElement);
        });
    }
});
