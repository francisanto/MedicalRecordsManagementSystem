// doctor.js - Doctors adding medical records

document.addEventListener("DOMContentLoaded", () => {
    const addRecordForm = document.getElementById("addRecordForm");

    if (addRecordForm) {
        addRecordForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const patientId = document.getElementById("patientId").value;
            const diagnosis = document.getElementById("diagnosis").value;
            const treatment = document.getElementById("treatment").value;

            const response = await fetch("/api/doctor/addRecord", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ patientId, diagnosis, treatment }),
            });

            if (response.ok) {
                alert("Record added successfully");
                addRecordForm.reset();
            } else {
                alert("Failed to add record");
            }
        });
    }
});
