document.addEventListener("DOMContentLoaded", function () {
    const role = localStorage.getItem("selectedRole");

    if (role) {
        document.getElementById("role-title").textContent = `Login as ${capitalize(role)}`;
        document.getElementById("role").value = role;
        document.getElementById("createAccount").href = `register.html?role=${role}`;
    }
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    const email = document.querySelector("input[name='email']").value;
    const password = document.querySelector("input[name='password']").value;
    const role = document.getElementById("role").value; // Get the role

    if (!email || !password || !role) {
        alert("All fields are required!");
        return;
    }

    try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store user details & role in localStorage
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("role", data.user.role);

            // Redirect based on role without alert
            if (data.user.role === "admin") {
                window.location.href = "admin-dashboard.html";
            } else if (data.user.role === "doctor") {
                window.location.href = "doctor-dashboard.html";
            } else if (data.user.role === "patient") {
                window.location.href = "patient-dashboard.html";
            } else {
                alert("Invalid role. Contact admin.");
            }
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error("Login Error:", error);
        alert("An error occurred. Please try again.");
    }
});
