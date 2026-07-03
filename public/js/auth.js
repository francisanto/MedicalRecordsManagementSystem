// auth.js - Handles authentication & redirects

document.addEventListener("DOMContentLoaded", () => {
    const userRole = localStorage.getItem("role");

    if (userRole) {
        switch (userRole) {
            case "admin":
                window.location.href = "/admin-dashboard.html";
                break;
            case "doctor":
                window.location.href = "/doctor-dashboard.html";
                break;
            case "patient":
                window.location.href = "/patient-dashboard.html";
                break;
            default:
                console.log("Unknown role");
        }
    }
});

function loginUser(role) {
    localStorage.setItem("role", role);
    window.location.reload();
}
