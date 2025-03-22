// admin.js - Admin panel logic (add users, search, notifications)

document.addEventListener("DOMContentLoaded", () => {
    const addDoctorBtn = document.getElementById("addDoctorBtn");
    const addPatientBtn = document.getElementById("addPatientBtn");

    if (addDoctorBtn) {
        addDoctorBtn.addEventListener("click", () => {
            window.location.href = "/add-doctor.html";
        });
    }

    if (addPatientBtn) {
        addPatientBtn.addEventListener("click", () => {
            window.location.href = "/add-patient.html";
        });
    }
});
